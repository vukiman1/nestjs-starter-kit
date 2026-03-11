FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production 

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/client ./client

EXPOSE 8000

CMD ["pnpm", "start:prod"]
