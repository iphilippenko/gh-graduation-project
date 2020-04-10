FROM node:12-alpine

WORKDIR /usr/src/app

RUN mkdir api && mkdir client

COPY package*.json .
COPY /client/package*.json ./client
COPY /api/package*.json ./api

RUN npm run client:install-dependencies
RUN npm run api:install-dependencies

COPY /api ./api
COPY /client ./client

RUN npm run client:build:prod
RUN npm run api:build

COPY /client/dist/client ./api/client

EXPOSE 5001

CMD npm run api:start-prod
