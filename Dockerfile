FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm install --save

COPY . .

VOLUME [ "/app/database" ]

EXPOSE 5000

CMD [ "npm", "start" ]