FROM node:18.12.1-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json  ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18.12.1-alpine
WORKDIR /app
COPY --from=builder /app/.output ./.output
COPY package.json package-lock.json ./
RUN npm install
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]