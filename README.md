# Discord Tags

Explore the largest collection of Discord Server Tags. Customize your Discord profile with unique
tags by joining servers.

Check out the website at https://discordtags.me.

## Motivation

Agentic development has been gaining a lot of popularity, but I haven't been keeping up because it
isn't useful for most of the code I write. With the release of Google Antigravity and Gemini 3, I
wanted to survey the current state of agentic development. Every line of code here in this project
is written by Antigravity with a mix of Gemini 3 and Claude Sonnet 4.5 (thanks to rate limits); it
took me about 150 prompts to get from nothing to what is here now.

I can see why there's so much hype for this technology. The idea of an agent handling everything
from planning to writing code and testing is very attractive. It could be incredibly useful for less
critical and easily testable applications like frontend development, and I can almost fully imagine
agents taking over these domains once the technology matures.

However, I found the performance of the agent still underwhelming as of now. Code quality suffered
and consistency degraded rapidly as the codebase grew. Every prompt largely felt like a hit-or-miss
experience, particularly when fixing bugs, as the agent was unable to pinpoint the root causes and
often applied random patches. I still needed to read the code and provide the agent with significant
guidance to get it to successfully do what I wanted.

It was fun watching the agent do all the work anyway. Maybe I'll test this again the next time some
company makes another overly glorious announcement about their product or model!

## Running

Follow these steps to run the application.

1. Install [Node.js](https://nodejs.org/en/download/).
2. Install dependencies using `npm install`.
3. Fill in the configurations in `.env`.
4. Initialize and migrate the database using `npx prisma migrate deploy`.
5. Run `npm run dev` for development.
6. Alternatively, run `npm run build && npm run start` for production.

## License

This project is licensed under the [MIT License](LICENSE).
