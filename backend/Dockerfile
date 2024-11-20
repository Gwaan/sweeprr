# Étape de base
FROM node:22.11-alpine AS base

# Étape des dépendances
FROM base AS dependencies
WORKDIR /app
COPY package.json yarn.lock tsconfig.json ./
RUN yarn install --frozen-lockfile

# Copie uniquement les fichiers nécessaires pour le build
COPY . .
RUN yarn build

# Étape de production
FROM base AS production
WORKDIR /app
COPY --from=dependencies /app/dist ./dist
COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json ./

# Exposition du port
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "dist/index.js"]
