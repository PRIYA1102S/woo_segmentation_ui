FROM node:18-alpine

WORKDIR /app
COPY package.json package.json
RUN npm install --production

COPY src src

ENV INGEST_PORT=5001
ENV CRON_SCHEDULE="*/5 * * * *"
ENV NODE_ENV=production

EXPOSE ${INGEST_PORT}

CMD ["node", "src/index.js"]