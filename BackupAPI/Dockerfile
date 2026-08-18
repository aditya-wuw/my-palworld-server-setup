FROM docker.io/library/node:24-alpine
# Install docker CLI
# RUN apk add --no-cache docker-cli
WORKDIR /app
COPY package*.json pnpm-lock.yaml* ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
EXPOSE 3000
CMD ["pnpm","run","run:backupAPI"]
