FROM node:22.11-alpine AS build

WORKDIR /app
ADD . /app
RUN npm config set strict-ssl fals
RUN npm ci && npm run build

FROM caddy:2.6.4-alpine
EXPOSE 4200
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist/frontend/* /usr/share/caddy
