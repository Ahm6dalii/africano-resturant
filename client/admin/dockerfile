FROM  node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

CMD ["ng","serve" ,"-o" ]

FROM node:18 as builder
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm i @angular/cli -g
RUN npm run build

EXPOSE 4200
CMD ["ng","serve" ,"-o" ]