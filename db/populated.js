#! /usr/bin/env node

const { Client } = require("pg");
const sqlConnection = require('../env/dev.env');
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
  trainer_id INTEGER REFERENCES trainer(id) ON DELETE CASCADE,
  pokemon_id INTEGER REFERENCES pokemon(id) ON DELETE CASCADE
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
   connectionString: `postgresql://${sqlConnection.DB_CONFIG.user}:${sqlConnection.DB_CONFIG.password}@${sqlConnection.DB_CONFIG.host}:${sqlConnection.DB_CONFIG.port}/${sqlConnection.DB_CONFIG.database}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
