FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN yarm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]