FROM node:11-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

RUN cp config/config_server.js client/src/config/config_server.js

RUN cd client && npm install && npm run-script build

CMD [ "node", "main.js" ]
