FROM node:16-alpine

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

USER node

RUN yarn --pure-lockfile

COPY --chown=node:node . .

RUN yarn test

CMD ["yarn", "start"]

EXPOSE 5000