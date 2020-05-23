FROM node:10-alpine

WORKDIR /main
COPY ./backend/authServer.js /main
COPY ./package.json /main
COPY ./package-lock.json /main

RUN npm install

EXPOSE 3001

CMD ["node", "authServer.js"]