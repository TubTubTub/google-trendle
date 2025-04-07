FROM node:20-alpine AS build-stage

# # #

ARG VITE_BACKEND_URL
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_BACKEND_AUTH_KEY

# # #

WORKDIR /usr/src/app

COPY . .

# # #

RUN npm ci --force

RUN npm run build

# # #

FROM nginx:stable-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html