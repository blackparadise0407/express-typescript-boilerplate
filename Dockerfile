FROM node:14-alpine

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 8081

CMD ["yarn", "start:prod"]