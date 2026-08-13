FROM docker.io/library/node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 31222
CMD ["node", "index.js"]
