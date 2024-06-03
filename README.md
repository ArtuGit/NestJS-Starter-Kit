# NestJS Starter Kit v3

See also [NestJS-Starter-Kit v2](https://github.com/ArtuGit/NestJS-Starter-Kit/tree/v2)

TypeORM: Postgres

Minimalist, ready-to-use boilerplate with full-fledged Auth and Users sections, dev and CI configs.

## Start / Stop

Install dependencies:
`pnpm install`

### Start

```
cp ./example.env ./.env
docker-compose up -d
pnpm run start:dev
```

Seed demo data
`pnpm run console:dev job seed`

To prepare static for the following link:  
`pnpm run build`

Go to http://localhost:3000

### Stop

Finish Docker
`docker compose stop`
