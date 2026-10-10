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

INSERT INTO pokemon (pokemon_name, imageurl, levels, hp, status_pokemon)
SELECT v.pokemon_name, v.imageurl, v.levels, v.hp, v.status_pokemon
FROM (VALUES
  ('Bulbasaur',  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',   16, 82, NULL),
  ('Charmander', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',   14, 75, NULL),
  ('Squirtle',   'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',   15, 90, 'Traded away'),
  ('Pikachu',    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',  20, 95, NULL),
  ('Jigglypuff', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png',  12, 70, NULL),
  ('Meowth',     'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png',  13, 65, NULL),
  ('Abra',       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/63.png',  11, 55, NULL),
  ('Machop',     'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/66.png',  17, 88, NULL),
  ('Gastly',     'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png',  14, 60, NULL),
  ('Eevee',      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png', 18, 80, NULL)
) AS v(pokemon_name, imageurl, levels, hp, status_pokemon)
WHERE NOT EXISTS (SELECT 1 FROM pokemon p WHERE p.pokemon_name = v.pokemon_name);

INSERT INTO trainers (trainer_name, imageurl)
SELECT v.trainer_name, v.imageurl
FROM (VALUES
  ('Ash Ketchum', 'https://api.dicebear.com/9.x/adventurer/svg?seed=Ash%20Ketchum'),
  ('Misty',       'https://api.dicebear.com/9.x/adventurer/svg?seed=Misty'),
  ('Brock',       'https://api.dicebear.com/9.x/adventurer/svg?seed=Brock'),
  ('Gary Oak',    'https://api.dicebear.com/9.x/adventurer/svg?seed=Gary%20Oak')
) AS v(trainer_name, imageurl)
WHERE NOT EXISTS (SELECT 1 FROM trainers t WHERE t.trainer_name = v.trainer_name);

INSERT INTO pokmon_types (pokemon_id, types_id)
SELECT p.id, t.id
FROM (VALUES
  ('Bulbasaur',  'Grass'),
  ('Bulbasaur',  'Poison'),
  ('Charmander', 'Fire'),
  ('Squirtle',   'Water'),
  ('Pikachu',    'Electric'),
  ('Jigglypuff', 'Normal'),
  ('Jigglypuff', 'Fairy'),
  ('Meowth',     'Normal'),
  ('Abra',       'Psychic'),
  ('Machop',     'Fighting'),
  ('Gastly',     'Ghost'),
  ('Gastly',     'Poison'),
  ('Eevee',      'Normal')
) AS v(pokemon_name, type_name)
JOIN pokemon p ON p.pokemon_name = v.pokemon_name
JOIN types t ON t.type_name = v.type_name
WHERE NOT EXISTS (
  SELECT 1 FROM pokmon_types pt WHERE pt.pokemon_id = p.id AND pt.types_id = t.id
);

INSERT INTO trainers_pokemon (trainer_id, pokemon_id)
SELECT tr.id, p.id
FROM (VALUES
  ('Ash Ketchum', 'Bulbasaur'),
  ('Ash Ketchum', 'Charmander'),
  ('Ash Ketchum', 'Squirtle'),
  ('Misty',       'Pikachu'),
  ('Misty',       'Jigglypuff'),
  ('Misty',       'Meowth'),
  ('Brock',       'Abra'),
  ('Brock',       'Machop'),
  ('Brock',       'Gastly'),
  ('Gary Oak',    'Eevee'),
  ('Gary Oak',    'Bulbasaur'),
  ('Gary Oak',    'Charmander')
) AS v(trainer_name, pokemon_name)
JOIN trainers tr ON tr.trainer_name = v.trainer_name
JOIN pokemon p ON p.pokemon_name = v.pokemon_name
WHERE NOT EXISTS (
  SELECT 1 FROM trainers_pokemon tp WHERE tp.trainer_id = tr.id AND tp.pokemon_id = p.id
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
