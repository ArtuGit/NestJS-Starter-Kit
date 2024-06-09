# NestJS Starter Kit v3

See also [NestJS-Starter-Kit v2](https://github.com/ArtuGit/NestJS-Starter-Kit/tree/v2)

## Features

- TypeORM (Postgres), Migrations, Seeding
- OpenAPI (Swagger)
- Auth (JWT) and Users full-fledged modules
- Sending mail (Nodemailer or SendGrid), catch with MailHog
- CI (GitHub Actions)
- Docker setup
- Config, Logger, Validation
- Unit and e2e test examples

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
