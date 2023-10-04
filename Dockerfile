FROM node:18.17.0

WORKDIR /appp

ENV NODE_ENV=production

COPY package*.json .

RUN npm install

COPY . .

CMD ["node", "index.js"]

EXPOSE 4000
