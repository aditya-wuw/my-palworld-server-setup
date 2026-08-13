FROM docker.io/library/node:24-alpine
WORKDIR /app
COPY package*.json pnpm-lock.yaml* ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
EXPOSE 31222
CMD ["pnpm","run","run:backupAPI"]
