# Étape de base : Utilisation de l'image officielle Node.js comme image de base
FROM node:22.11-alpine AS base

# Étape des dépendances
FROM base AS dependencies

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . ./

FROM base AS production

WORKDIR /app

COPY --from=dependencies /app /app

RUN yarn build

EXPOSE 3000

VOLUME /root
CMD ["yarn", "start"]
