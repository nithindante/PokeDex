const pool = require("./pool");

async function getAllPokemon() {
  const newRows = await pool.query(
    "SELECT  pokemon.id,  pokemon.pokemon_name,    pokemon.imageurl ,    types.type_name  FROM pokemon JOIN pokmon_types   ON pokemon.id = pokmon_types.pokemon_id JOIN types  ON pokmon_types.types_id = types.id;",
  );
  return newRows.rows;
}

async function getTypes() {
  const { rows } = await pool.query("SELECT * FROM types");
  return rows;
}
async function getAllTrainers() {
  const { rows } = await pool.query("SELECT * FROM trainers");
  return rows;
}
async function insertUsername(username) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

async function insertPokemon(pokemon) {
  const { rows } = await pool.query("SELECT * FROM types");
  const relevantPokemonType = rows.find(
    (type) => type.type_name === pokemon.pokemonType,
  );
  const pokemonAdded = await pool.query(
    "INSERT INTO pokemon VALUES (DEFAULT,$1,$2) RETURNING id;",
    [pokemon.pokemonName, pokemon.pokemonUrl],
  );
  console.log(pokemonAdded.rows)
  await pool.query("INSERT INTO pokmon_types VALUES (DEFAULT,$1,$2) ", [
    pokemonAdded.rows[0].id,
    relevantPokemonType.id,
  ]);
}

async function findPokemonById(pokemonId) {
  const { rows } = await pool.query(
    "SELECT pokemon.id, pokemon.pokemon_name, pokemon.imageurl, types.type_name FROM pokemon JOIN pokmon_types ON pokemon.id = pokmon_types.pokemon_id JOIN types ON pokmon_types.types_id = types.id WHERE pokemon.id = $1",
    [pokemonId],
  );
  return rows;
}

async function findPokemonByName(pokemonName) {
  const { rows } = await pool.query(
    "SELECT pokemon.id from pokemon where pokemon.pokemon_name = $1",
    [pokemonName],
  );
  return rows;
}
async function findTrainerById(trainerId) {
  const { rows } = await pool.query(
    "SELECT trainers.id, trainers.trainer_name, trainers.imageurl, pokemon.id AS pokemon_id, pokemon.pokemon_name, pokemon.imageurl AS pokemon_imageurl, pokemon.levels, pokemon.hp, pokemon.status_pokemon, types.type_name FROM trainers JOIN trainers_pokemon ON trainers.id = trainers_pokemon.trainer_id JOIN pokemon ON trainers_pokemon.pokemon_id = pokemon.id JOIN pokmon_types ON pokemon.id = pokmon_types.pokemon_id JOIN types ON pokmon_types.types_id = types.id WHERE trainers.id = $1",
    [trainerId],
  );
  return rows;
}

async function findTrainer(trainer) {
  const { rows } = await pool.query(
    "SELECT trainers.id from trainers where trainers.trainer_name=$1",
    [trainer.trainerName],
  );
  return rows;
}
async function deletePokemon(pokemonId) {
  await pool.query("DELETE FROM pokemon WHERE id=$1", [pokemonId]);
}

const DEFAULT_TRAINER_IMAGE =
  "https://play.pokemonshowdown.com/sprites/trainers/red.png";

async function addTrainer(trainer) {
  const imageUrl = trainer.trainerImageUrl?.trim() || DEFAULT_TRAINER_IMAGE;
  const addTrainersDefault = async () => {
    const addedTrainer = await pool.query(
      "INSERT INTO trainers VALUES (DEFAULT,$1,$2) RETURNING id;",
      [trainer.trainerName, imageUrl],
    );
    return addedTrainer;
  };
  const trainerId = await Promise.all([addTrainersDefault()]);
  const trainerAdded = [];
  trainerId.map((tId) => trainerAdded.push(tId.rows[0].id));
  const pokemonIdAdd = await Promise.all(
    trainer.pokemons.map(async (pokemon) => {
      const pokemonIdAdded = await pool.query(
        "SELECT id from pokemon where id=$1",
        [pokemon],
      );
      return pokemonIdAdded;
    }),
  );
  await Promise.all(pokemonIdAdd.map(async (pokemonId) => {
    await pool.query("INSERT INTO trainers_pokemon VALUES (DEFAULT,$1,$2)", [
      trainerAdded[0],
      pokemonId.rows[0].id,
    ]);
  })) 
}

async function totalTrainers() {
  return await pool.query("SELECT COUNT(*) FROM trainers;");
}
async function totalPokemon() {
  return await pool.query("SELECT COUNT(*) FROM pokemon;");
}
async function totalTypes() {
  return await pool.query("SELECT COUNT(*) FROM types;");
}
async function addPokemonToTrainer(pokemonIdArr, trainerId) {
  await Promise.all(
    pokemonIdArr.map(async (pokemonId) => {
      await pool.query("INSERT INTO trainers_pokemon VALUES (DEFAULT,$1,$2)", [
        trainerId,
        pokemonId,
      ]);
    }),
  );
}

async function deletePokemonFromTrainer(trainerId, pokemonId) {
  await pool.query(
    "DELETE FROM trainers_pokemon WHERE trainer_id=$1 AND pokemon_id=$2",
    [trainerId, pokemonId],
  );
}

async function deleteTrainer(trainerId) {
  await pool.query("DELETE FROM trainers WHERE id=$1", [trainerId]);
}

async function getAllTypes() {
  return await pool.query("SELECT * FROM types");
}
module.exports = {
  getAllPokemon,
  getTypes,
  getAllTrainers,
  insertUsername,
  findPokemonById,
  findTrainerById,
  insertPokemon,
  deletePokemon,
  addTrainer,
  addPokemonToTrainer,
  findTrainer,
  findPokemonByName,
  totalTrainers,
  totalPokemon,
  totalTypes,
  deletePokemonFromTrainer,
  deleteTrainer,
  getAllTypes,
};
