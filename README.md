# PokeDex
A Pokedex built in Node.js and Express

## Database configuration
The app uses PostgreSQL via `db/pool.js`.

- **Production (e.g. Render):** set the `DATABASE_URL` environment variable to your Postgres connection string. SSL is enabled automatically.
- **Local development:** if `DATABASE_URL` is not set, it connects to `localhost:5432`, database `inventory`.
