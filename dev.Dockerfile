
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn run build-storybook

FROM nginx:alpine
COPY --from=build /app/storybook-static /usr/share/nginx/html/design-system
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# To build the image
# docker build -t storybook-image .
# launch the image in a container/storybook on the url: http://localhost/design-system
# docker run -p 80:80 storybook-image
