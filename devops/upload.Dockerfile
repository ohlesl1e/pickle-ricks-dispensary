FROM node:10-alpine

WORKDIR /main
COPY ./backend/addItemServer.js /main
COPY ./package.json /main
COPY ./package-lock.json /main

RUN npm install

EXPOSE 3002

CMD ["node", "addItemServer.js"]