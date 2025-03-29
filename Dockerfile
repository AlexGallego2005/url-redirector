FROM node:20

RUN groupmod -g 1010 node && \
    usermod -u 1010 -g 1010 node

USER node

WORKDIR /app

COPY --chown==node:node package*.json .

RUN npm install

COPY --chown==node:node . .

EXPOSE 5000

CMD [ "npm", "start" ]