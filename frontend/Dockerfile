FROM node:22.11-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn global add @angular/cli
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
