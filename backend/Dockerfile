# Étape de base : Utilisation de l'image officielle Node.js comme image de base
FROM node:22.11-alpine AS base

# Étape des dépendances
FROM base AS dependencies

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./

RUN yarn add ts-node tsconfig-paths -D

RUN yarn install --frozen-lockfile

COPY . ./

# Étape de production
FROM base AS production

WORKDIR /app

COPY --from=dependencies /app /app

RUN yarn build

EXPOSE 3000

CMD ["yarn", "ts-node", "-r", "tsconfig-paths/register", "src/index.ts"]
