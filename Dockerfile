FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn set version 3.2.1
RUN yarn install

COPY . .

RUN yarn test
RUN yarn workspaces focus --production

CMD ["yarn", "start"]

EXPOSE 5000

USER node