FROM node:16 AS builder

WORKDIR /app

# install dependencies

COPY ../../package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:16 AS runner

WORKDIR /app

COPY --from=builder /app/dist/src/user-service ./dist/src/user-service
COPY --from=builder /app/dist/src/modals ./dist/src/modals
COPY --from=builder /app/dist/src/utils ./dist/src/utils
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env ./

EXPOSE 3001

CMD ["node", "dist/src/user-service/index.js"]