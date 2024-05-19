# NestJS Starter Kit v3

TypeORM: Postgres

Minimalist, ready-to-use boilerplate with full-fledged Auth and Users sections, dev and CI configs.

## Start / Stop

Install dependencies:
`pnpm install`

### Start

```
cp ./example.env ./.env
docker compose up
pnpm run start:dev
```

To prepare static for the following link:  
`pnpm run build`

Go to http://localhost:3000

### Stop

Finish Docker
`docker compose stop`
