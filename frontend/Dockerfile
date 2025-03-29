FROM node:20-alpine AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

# # #

FROM nginx:stable-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
COPY deployment/nginx.default.conf /etc/nginx/conf.d/default.conf