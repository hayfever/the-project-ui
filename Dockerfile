FROM node:alpine

RUN mkdir -p /app
WORKDIR /app

ADD package.json /app
RUN npm install

ENV API_HOST http://project-api.haydenluckenbach.com

COPY . /app
RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]
