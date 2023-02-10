# NestJS Starter Kit v2

## Features

### Dev Tools

- Better ESLint configuration
- Better Prettier configuration
- Husky (pre-commit, pre-push)
- Simple and necessary Swagger definitions
- Read-Eval-Print-Loop (REPL) mode
- Jobs

### Configuration

- custom config directory and files
- config validation
- common and local configuration examples

### JWT authentication

- Access and Refresh tokens
- Storing Refresh tokens in DB
- Login
- Refresh token revoking (logout)

### ORM and DB

- TypeORM
- Tested on MySQL (ready for others DBs)

### Docker

- multi-stage build (dev, prod)

### It contains working examples

- REST API Endpoints: POST, POST upload, GET, PUT, PATCH, DELETE
- Validation and DTOs for requests Params, Bodies and Query strings
- Router, Controllers, Services, Entities, Repository
- Interfaces to sync with Front End
- Logger Using
- Static Content
- Decorators, Guards, Strategies, and others

### Tests

- Unit Tests with Jest spy
- E2E Tests with Jest Mock of DB layer

## Start/Stop

Install dependencies:
`npm install`

### Start

Copy config file for Docker
`cp ./config/common.env ./.env`

Start with dockerized Node and MySQL
`docker compose up`

or Start with dockerized MySQL and local node *(recommended currently)*

```
docker compose up mysql
npm run start:dev
```

### Stop

Finish Docker
`docker compose stop`
