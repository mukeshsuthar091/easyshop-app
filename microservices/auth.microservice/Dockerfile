FROM node:12.13-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

CMD ["node", "dist/main"]