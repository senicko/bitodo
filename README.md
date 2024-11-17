# Bitodo

A recruitment task for AGH KN BIT.

> NOTE: This projects uses `pnpm`.

## Running Backend

Install dependencies:

```
pnpm i
```

Start services configured in `compose.yml` (just PostgreSQL database instance at the moment):

```
docker compose up -d
```

Copy `.env.example` and rename it to `.env.local`. The example env file is configured to work with the database span up with `compose.yml` file so you should be ready to go.

> NOTE: If you are running PostgreSQL database on your own you may need to change database connection details in your `.env.local` file.

Finally, run the server with

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
