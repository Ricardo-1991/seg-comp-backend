FROM ubuntu:18.04

WORKDIR /app

COPY . .

#RUN apt-get update

RUN npm install
RUN npx prisma migrate dev --name init
RUN npx prisma migrate deploy
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
