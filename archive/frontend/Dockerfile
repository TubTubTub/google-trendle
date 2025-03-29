FROM node:20 AS build-stage

ENV VITE_BACKEND_URL='http://localhost:8080/api'

WORKDIR /usr/src/app

COPY . .

RUN npm ci --force

RUN npm run build



FROM nginx:1.27-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x ./docker-entrypoint.d/env.sh

# docker build -t front .
# docker run -p 5173:5000 front