FROM node:latest AS builder

WORKDIR /usr/src/app

COPY package.json package.json
COPY bun.lockb bun.lockb
RUN npm install -g bun && bun install --frozen-lockfile
COPY . .
RUN bun run build-storybook

FROM alpine:3.15 as Stage
WORKDIR /usr/src/app/storybook-static
COPY --from=builder /usr/src/app/storybook-static /usr/src/app/storybook-static

FROM alpine:3.15
COPY --from=Stage /usr/src/app/storybook-static /usr/src/app/storybook-static
