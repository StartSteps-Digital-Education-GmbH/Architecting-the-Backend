FROM node:16 AS builder

WORKDIR /app

# install dependencies

COPY ../../package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:16 AS runner

WORKDIR /app

COPY --from=builder /app/dist/src/flight-service ./dist/src/flight-service
COPY --from=builder /app/dist/src/entities ./dist/src/entities
COPY --from=builder /app/dist/src/database ./dist/src/database
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3002

CMD ["node", "dist/src/flight-service/server.js"]