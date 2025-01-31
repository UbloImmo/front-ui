FROM node:latest AS builder

WORKDIR /usr/src/app

COPY package.json package.json
COPY bun.lockb bun.lockb

# Installs bun globally
RUN npm install -g bun

# Installs the dependencies using bun
RUN bun install --frozen-lockfile

# Copies the rest of the files
COPY . .

# Allow 6GB of memory for the build
ENV NODE_OPTIONS="--max-old-space-size=6144"

# Generates the docs with typedoc, typedoc-plugin-markdown and custom MDX plugin
RUN bun run docs:generate

# Builds the storybook
RUN bun run storybook:build

FROM alpine:3.15 as Stage
WORKDIR /usr/src/app/storybook-static
COPY --from=builder /usr/src/app/storybook-static /usr/src/app/storybook-static

FROM alpine:3.15
COPY --from=Stage /usr/src/app/storybook-static /usr/src/app/storybook-static
