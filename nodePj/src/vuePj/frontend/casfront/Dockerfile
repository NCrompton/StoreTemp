FROM node:19 as dev

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]


FROM nginx:1.17.5-alpine as prod
COPY --from=build-stage /dist/spa /usr/share/nginx/html
EXPOSE 4000
CMD ["nginx", "-g", "daemon off;"]
