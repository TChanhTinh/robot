FROM node:12

RUN mkdir /src

RUN npm install nodemon -g

WORKDIR /src
ADD package.json /src/package.json
ADD . .
RUN npm install

EXPOSE 3000

CMD npm start
