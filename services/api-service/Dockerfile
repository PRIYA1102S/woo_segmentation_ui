FROM node:18-alpine

WORKDIR /app

# copy package.json from the current build context (services/api-service)
COPY package.json package.json
RUN npm install --production

# copy service source from the current build context
COPY src src

ENV API_PORT=4000
ENV NODE_ENV=production

EXPOSE ${API_PORT}

CMD ["node", "src/app.js"]