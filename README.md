# Bitodo

A recruitment task for AGH KN BIT.

> NOTE: This projects uses `pnpm`.

## Running Backend

Installing dependencies

```
pnpm i
```

Starting services configured in `compose.yml` (just PostgreSQL database instance at the moment).

```
docker compose up -d
```

After starting the database copy `.env.example` and rename it to `.env.local`. The example env file is configured to work with the database configured in `compose.yml` file so you should be ready to go.

> NOTE: If you are running PostgreSQL database on your own you may need to change database connection details in your `.env.local` file.

Finally, start the server with

```
pnpm dev
```

## Running Frontend

Frontend app is built with React & Vite. To get started install dependencies

```
pnpm i
```

Then run the app locally with

```
pnpm dev
```
