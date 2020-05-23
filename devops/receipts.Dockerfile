FROM node:10-alpine

WORKDIR /main
COPY ./backend/transactionServer.js /main
COPY ./package.json /main
COPY ./package-lock.json /main

RUN npm install

EXPOSE 3006

CMD ["node", "transactionServer.js"]