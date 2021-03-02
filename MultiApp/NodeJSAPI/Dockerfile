FROM node:15.2.0-alpine3.10

EXPOSE 8080

WORKDIR app

COPY . .

RUN npm install

CMD ["node","index.js"]

# docker build -t nodejsapi:1.0.0 .
# docker container run -it -d -p 3333:8080 --network custom_network --name nodejsapi nodejsapi:1.0.0