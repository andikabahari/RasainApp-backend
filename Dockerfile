FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY .yarnrc.yml ./
COPY .yarn .yarn/

RUN yarn set version 3.2.1
RUN yarn install
RUN yarn workspaces focus --production

COPY . .

CMD ["yarn", "start"]

EXPOSE 8080

USER node