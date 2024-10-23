FROM node:latest

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

#RUN npx prisma migrate dev --name init

RUN npx prisma migrate deploy

#RUN npm prisma generate

EXPOSE 3000

CMD ["npm", "run", "start"]