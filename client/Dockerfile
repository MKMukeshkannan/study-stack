FROM node:20-alpine as BUILD_IMAGE
WORKDIR /client

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

FROM node:20-alpine as PRODUCTION_IMAGE

WORKDIR /client

COPY --from=BUILD_IMAGE /client/dist/ /client/dist/
EXPOSE 8080

COPY package.json .
COPY vite.config.ts .
RUN yarn add typescript

EXPOSE 8080
CMD ["yarn", "preview"]
