FROM node:18-alpine

WORKDIR /app

COPY package.json package.json

RUN npm install --production

COPY src src

ENV API_PORT=4000

EXPOSE ${API_PORT}

CMD ["node", "src/app.js"]