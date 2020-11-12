FROM node:15.2.0-alpine3.10

EXPOSE 3000

RUN apk add --update tini 

RUN mkdir -p /usr/src/app 

WORKDIR /usr/src/app 

COPY package.json package.json

RUN npm install && \
  npm cache clean --force 

COPY . .

CMD ["tini","--","node", "./bin/www"]


# docker build -t testnode .
# docker container run -it -p 3000:3000 --rm --name testnode testnode:latest

