FROM node:10-alpine

WORKDIR /main
COPY ./backend/invServer.js /main
COPY ./package.json /main
COPY ./package-lock.json /main

RUN npm install

EXPOSE 3005

CMD ["node", "invServer.js"]