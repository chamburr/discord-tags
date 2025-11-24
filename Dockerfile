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

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN apk add --no-cache curl

COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

RUN npm install prisma@$(node -p "require('./node_modules/@prisma/client/package.json').version") --no-save && npm cache clean --force

RUN touch /var/log/cron.log && chown nextjs:nodejs /var/log/cron.log

RUN echo "0 * * * * . /data/project_env.sh; curl -H \"Authorization: Bearer \${CRON_SECRET}\" http://localhost:3000/api/cron >> /var/log/cron.log 2>&1" \
    > /etc/crontabs/nextjs && \
    chown nextjs:nodejs /etc/crontabs/nextjs && \
    chmod 600 /etc/crontabs/nextjs

RUN printf "#!/bin/sh\n\
echo \"export CRON_SECRET=\${CRON_SECRET}\" > /data/project_env.sh\n\
npx prisma migrate deploy\n\
crond -b -l 8\n\
node server.js\n" > /app/start.sh && \
    chmod +x /app/start.sh && \
    chown nextjs:nodejs /app/start.sh

RUN mkdir -p /data && chown nextjs:nodejs /data

USER nextjs:nodejs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["/app/start.sh"]
