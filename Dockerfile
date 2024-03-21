FROM node:18 AS builder

WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn run build-storybook

FROM alpine:3.15 as Stage
WORKDIR /usr/src/app/storybook-static
COPY --from=builder /usr/src/app/storybook-static /usr/src/app/storybook-static

FROM alpine:3.15
COPY --from=Stage /usr/src/app/storybook-static  /usr/src/app/storybook-static
