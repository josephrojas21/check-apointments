# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG env=qa
COPY ./.env.$env ./.env
RUN npm run build:portal

# production stage

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/release /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]