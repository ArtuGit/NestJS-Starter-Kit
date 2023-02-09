# NestJS Starter Kit v2

## Features

### Dev Tools

- Better ESLint configuration
- Better Prettier configuration
- Husky (pre-commit, pre-push)
- Simple and necessary Swagger definitions
- Read-Eval-Print-Loop (REPL) mode

### Configuration

- custom config directory and files
- config validation
- common and local configuration examples

### JWT authentication

- Access and Refresh tokens
- Storing Refresh tokens in DB
- Refresh token revoking (logout)

### ORM and DB

- TypeORM
- Tested on MySQL (ready for others DBs)

### Docker

- multi-stage build (dev, prod)

### Examples

- Authentication: JWT Token,Refresh Token 
- Users: Register, Login
- REST API Endpoints: POST, POST upload, GET, PUT, PATCH, DELETE
- Validation and DTOs for requests Params, Bodies and Query strings
- Controllers, Services, Entities, Repository
- Interfaces to sync with Front End
- Logger Using

### Tests

- Unit Tests with Jest spy
- E2E Tests with Jest Mock of DB layer

## Start/Stop

### Start

Copy config file for Docker
`cp ./config/common.env ./.env`

Start with dockerized Node and MySQL
`docker compose up`

or Start with dockerized MySQL and local node

```
docker compose up mysql
npm run start:dev
```

### Stop
Finish Docker
`docker compose stop`
