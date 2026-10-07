#! /usr/bin/env node

const { Client } = require("pg");
const dotenv = require('dotenv')
dotenv.config({
  path: './env/.env',
  debug: true
})
const SQL = `
CREATE TABLE IF NOT EXISTS pokemon (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  pokemon_name VARCHAR ( 255 ),
  imageUrl VARCHAR ( 255 ),
  levels INTEGER ,
  hp INTEGER ,
  status_pokemon VARCHAR (255)
);

  CREATE TABLE IF NOT EXISTS types (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  type_name VARCHAR ( 255 ),
  imageurl VARCHAR ( 255 )
);  

 CREATE UNIQUE INDEX IF NOT EXISTS unique_type_name ON types (type_name);

INSERT INTO types (type_name, imageurl) VALUES
  ('Normal',   'https://play.pokemonshowdown.com/sprites/types/Normal.png'),
  ('Fire',     'https://play.pokemonshowdown.com/sprites/types/Fire.png'),
  ('Water',    'https://play.pokemonshowdown.com/sprites/types/Water.png'),
  ('Electric', 'https://play.pokemonshowdown.com/sprites/types/Electric.png'),
  ('Grass',    'https://play.pokemonshowdown.com/sprites/types/Grass.png'),
  ('Ice',      'https://play.pokemonshowdown.com/sprites/types/Ice.png'),
  ('Fighting', 'https://play.pokemonshowdown.com/sprites/types/Fighting.png'),
  ('Poison',   'https://play.pokemonshowdown.com/sprites/types/Poison.png'),
  ('Ground',   'https://play.pokemonshowdown.com/sprites/types/Ground.png'),
  ('Flying',   'https://play.pokemonshowdown.com/sprites/types/Flying.png'),
  ('Psychic',  'https://play.pokemonshowdown.com/sprites/types/Psychic.png'),
  ('Bug',      'https://play.pokemonshowdown.com/sprites/types/Bug.png'),
  ('Rock',     'https://play.pokemonshowdown.com/sprites/types/Rock.png'),
  ('Ghost',    'https://play.pokemonshowdown.com/sprites/types/Ghost.png'),
  ('Dragon',   'https://play.pokemonshowdown.com/sprites/types/Dragon.png'),
  ('Dark',     'https://play.pokemonshowdown.com/sprites/types/Dark.png'),
  ('Steel',    'https://play.pokemonshowdown.com/sprites/types/Steel.png'),
  ('Fairy',    'https://play.pokemonshowdown.com/sprites/types/Fairy.png')
ON CONFLICT (type_name) DO NOTHING;
 
  CREATE TABLE IF NOT EXISTS pokmon_types (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  pokemon_id INTEGER REFERENCES pokemon(id) ON DELETE CASCADE,
  types_id INTEGER REFERENCES types(id) ON DELETE CASCADE
);

  CREATE TABLE IF NOT EXISTS trainers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  trainer_name  VARCHAR ( 255 ),
  imageurl  VARCHAR ( 255 )
);

  CREATE TABLE IF NOT EXISTS trainers_pokemon (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  trainer_id INTEGER REFERENCES trainers
  (id) ON DELETE CASCADE,
  pokemon_id INTEGER REFERENCES pokemon(id) ON DELETE CASCADE
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
