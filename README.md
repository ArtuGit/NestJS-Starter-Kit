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

- Custom config directory and files
- Config validation
- Common (in a repo) and local

### JWT authentication

- Access and Refresh tokens
- Storing Refresh tokens in DB
- Login / Logout
- Refresh token revoking

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
- Role-based access control (RBAC) - in progress

### Tests

- Unit Tests with Jest spy
- E2E Tests with Jest Mock of DB layer

### Docker

- Multi-stage build (dev, prod)

## Start / Stop

Install dependencies:
`npm install`

### Start

```
cp ./config/common.env ./.env
docker compose up
npm run start:dev
```

Go to http://localhost:3015

### Stop

Finish Docker
`docker compose stop`
