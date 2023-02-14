# NestJS Starter Kit v2

## Features

- Fastify
- TypeORM: tested on MySQL (ready for other DBs)
- Mongoose

### Dev Tools

- Better ESLint configuration
- Better Prettier configuration
- Husky (pre-commit, pre-push)
- Simple and necessary Swagger definitions
- Read-Eval-Print-Loop (REPL) mode
- Jobs (each job is run as a Nest CLI separate process)

### Configuration

- custom config directory and files
- config validation
- common (in a repo) and local

### JWT authentication

- Access and Refresh tokens
- Storing Refresh tokens in DB
- Login
- Refresh token revoking (logout)

### It contains working examples

- REST API Endpoints: POST, POST upload, GET, PUT, PATCH, DELETE
- Validation and DTOs for requests Params, Bodies and Query strings
- Modules, sub modules
- Router, Controllers, Services, Entities, Repository
- Configuration
- Interfaces to sync with Front End
- Logger Using
- Static Content
- Jobs
- Decorators, Guards, Strategies, and others

### Tests

- Unit Tests with Jest spy
- E2E Tests with Jest Mock of DB layer

### Docker

- multi-stage build (dev, prod)

## Start/Stop

Install dependencies:
`npm install`

### Start

Copy config file for Docker
`cp ./config/common.env ./.env`

Start with dockerized Node and MySQL
`docker compose up`

or Start with dockerized MySQL and local node (recommended currently)\_

```
docker compose up mysql
npm run start:dev
```

Go to http://localhost:3015

### Stop

Finish Docker
`docker compose stop`
