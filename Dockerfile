FROM node:24-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG DATABASE_URL="file:/dev/null"

RUN npx prisma generate
RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache curl su-exec

COPY --from=builder --chown=node:node /app/prisma ./prisma
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

RUN npm install prisma@$(node -p "require('./node_modules/@prisma/client/package.json').version") --no-save && npm cache clean --force

RUN touch /var/log/cron.log && chown node:node /var/log/cron.log

RUN echo "0 * * * * . /app/project_env.sh; curl -H \"Authorization: Bearer \${CRON_SECRET}\" http://localhost:3000/api/cron >> /var/log/cron.log 2>&1" \
    > /etc/crontabs/node && \
    chmod 600 /etc/crontabs/node

RUN printf "#!/bin/sh\n\
echo \"export CRON_SECRET=\${CRON_SECRET}\" > /app/project_env.sh\n\
su-exec node:node npx prisma migrate deploy\n\
crond -b -l 8\n\
exec su-exec node:node node server.js\n" > /app/start.sh && \
    chmod +x /app/start.sh

RUN mkdir -p /data && chown node:node /data

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["/app/start.sh"]
