FROM node:19

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "run", "start:dev"]