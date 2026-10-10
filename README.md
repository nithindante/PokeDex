# PokeDex
A Pokedex built in Node.js and Express

## Database configuration
The app uses PostgreSQL via `db/pool.js`.

- **Production (e.g. Render):** set the `DATABASE_URL` environment variable to your Postgres connection string. SSL is enabled automatically.
- **Local development:** if `DATABASE_URL` is not set, it connects to `localhost:5432`, database `inventory`.

## Seeding the database
Run `node db/populated.js` to create the tables (if missing) and seed them with:

- the 18 Pokémon types,
- 10 starter Pokémon (Bulbasaur to Eevee) with their types,
- 4 trainers (Ash Ketchum, Misty, Brock, Gary Oak) and the Pokémon they own.

It reads `DATABASE_URL` from `env/.env` (use the **External** Database URL when seeding a Render DB from your machine) and is safe to re-run: existing types are skipped (`ON CONFLICT (type_name) DO NOTHING`), and Pokémon, trainers and their links are only inserted when a row with the same name/relationship doesn't already exist.
