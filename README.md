# NestJS Starter Kit v3

## Features

- TypeORM (Postgres), Migrations, Seeding
- OpenAPI/Swagger: cli `swagger/plugin` allows to take all info which is defined in Typescript code to Swagger specification automatically 
- Auth (JWT) and Users full-fledged modules
- Sending mail (Nodemailer or SendGrid), catch with MailHog
- CI (GitHub Actions)
- Docker setup
- Config, Validation
- Logger (Winston), LoggerMiddleware
- Health check
- Unit and e2e test examples
- Enhanced ESLinters

## Run

### Prepare

Install dependencies:
`pnpm install`

Copy `.env.example` to `.env`
`cp ./example.env ./.env`

### Start

```
docker-compose up -d
pnpm run start:dev
```

Seed demo data:
`pnpm run console:dev job seed`

Go to http://localhost:3000

### Stop

Finish Docker
`docker compose stop`


---
See also [NestJS-Starter-Kit v2](https://github.com/ArtuGit/NestJS-Starter-Kit/tree/v2)
