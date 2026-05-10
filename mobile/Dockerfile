FROM node:20-alpine

WORKDIR /app

RUN npm install -g expo-cli

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8081

ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0

CMD ["npx", "expo", "start", "--web"]