FROM registry.digitalocean.com/ublo/front-ui-storybook:latest As Stage

# Use alpine the second stage 
FROM registry.digitalocean.com/ublo/front-ui-storybook:latest:latest
COPY --from=Stage /usr/src/app/storybook-static  /usr/src/app/storybook-static 
RUN echo "Useless step to make sure the image is built"
RUN touch test