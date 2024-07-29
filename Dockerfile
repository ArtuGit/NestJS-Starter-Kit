FROM node:20-alpine3.19

RUN apk update

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY . .

RUN npm install -g pnpm
RUN ["pnpm", "install"]

EXPOSE 3000

CMD ["pnpm", "run", "start:dev"]
