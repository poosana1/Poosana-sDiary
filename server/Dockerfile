# server/Dockerfile

FROM node:14

WORKDIR /usr/src/app/server

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

COPY . .

CMD ["npm", "start"]
