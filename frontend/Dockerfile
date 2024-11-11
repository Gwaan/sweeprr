FROM node:22.11-alpine AS build

WORKDIR /app
ADD . /app
RUN npm config set strict-ssl false
RUN npm ci && npm run build
CMD ["npm", "start"]


