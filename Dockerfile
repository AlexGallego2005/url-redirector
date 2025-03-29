FROM node:20

USER node

RUN groupmod -g 1010 node && \
    usermod -u 1010 -g 1010 node

WORKDIR /app

COPY --chown==node:node package*.json .

RUN npm install

COPY --chown==node:node . .

EXPOSE 5000

CMD [ "npm", "start" ]