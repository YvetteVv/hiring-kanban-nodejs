FROM node:12

WORKDIR /usr/src/app

COPY ./app/ ./app/
COPY ./static/ ./static/
COPY ./server.js ./
COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install --production

CMD [ "yarn", "start" ]
