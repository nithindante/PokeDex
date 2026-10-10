
const db = require("../db/queries.js");
const setTrainers = [];
const setPokemon = [];
const { body, param, validationResult } = require("express-validator");

const hasSelection = (value) => [].concat(value || []).length > 0;

const validatePokemon = [
  body("pokemonName")
    .trim()
    .notEmpty()
    .withMessage("Pokemon name is required")
    .bail()
    .matches(/^[A-Za-z][A-Za-z .'-]*$/)
    .withMessage(
      "Pokemon name can only contain letters, spaces, hyphens, apostrophes and periods",
    ),
];

const validateTrainer = [
  body("trainerName").trim().notEmpty().withMessage("Trainer name is required"),
  body("pokemons")
    .custom(hasSelection)
    .withMessage("Select at least one Pokemon"),
];

const validateAddPokemon = [
  param("trainerId").isInt().withMessage("Trainer ID must be a number"),
  body("pokemon").custom(hasSelection).withMessage("Select at least one Pokemon"),
];

const renderError = (res, status, errors) =>
  res.status(status).render("errors/notFound", { errors });

const renderDbError = (res, action, error) => {
  console.error(`Error while ${action}:`, error);
  renderError(res, 500, [{ path: "database", msg: `Could not ${action}: ${error.message}` }]);
};

removeDuplicates = (arr) => {
  arr.forEach((row, i) => {
    let obj = {
      id: row.id,
      name: row.pokemon_name,
      imageurl: row.imageurl,
      type: row.type_name,
    };
    if (arr[row.id]) {
      arr[row.id].type.push(row.type_name);
    } else {
      arr[row.id] = obj;
      arr[row.id].type = [row.type_name];
    }
  });
  return Object.values(arr);
}

async function getAllCount(req,res) {
  pokemonCount = await db.totalPokemon()
  typesCount = await db.totalTypes()
  trainersCount = await db.totalTrainers()
  res.render('index',{count:[pokemonCount.rows[0].count,trainersCount.rows[0].count,typesCount.rows[0].count]});
}
async function getAllPokemon(req, res) {
  try {
    const allPokemon = await db.getAllPokemon();
    let arr = {};
    allPokemon.forEach((row, i) => {
    let obj = {
        id: row.id,
        name: row.pokemon_name,
        imageurl: row.imageurl,
        type: row.type_name,
      };
      if (arr[row.id]) {
        arr[row.id].type.push(row.type_name);
    } else {
        arr[row.id] = obj;
        arr[row.id].type = [row.type_name];
    }
    });
    obj = Object.values(arr);
    // const obj = removeDuplicates(allPokemon);
    res.render("pokemon", { pokemon: obj });
  } catch (error) {
    console.error("Error fetching all Pokemon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllTrainers(req, res) {
  try {
    const allTrainers = await db.getAllTrainers();
    res.render("trainer", { setTrainers: allTrainers });
  } catch (error) {
    console.error("Error fetching all Trainers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllTypes(req, res) {
  try {
    const allTypes = await db.getTypes();
    res.render("type", { types: allTypes });
  } catch (error) {
    console.error("Error fetching all Types:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
createTrainer = [validateTrainer, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return renderError(res, 400, errors.array());
  }
  try {
    await db.addTrainer(req.body);
    res.redirect("/trainer");
  } catch (error) {
    renderDbError(res, "create the trainer", error);
  }
}];

createPokemon = [validatePokemon,async(req, res) => {
  const pokemon = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return renderError(res, 400, errors.array());
  }
  try {
    await db.insertPokemon(pokemon);
    res.redirect("/pokemon");
  } catch (error) {
    renderDbError(res, "create the Pokemon", error);
  }
}];

viewPokemon = (req, res) => {
  res.render("pokemon", { pokemon: setPokemon } );
};

viewTrainer = (req, res) => {
  res.render("trainer", { setTrainers });
};

viewType = (req, res) => {
  res.render("type", { types });
};

findPokemon = async (req, res) => {
  const { pokemonId } = req.params;
  const newPokemon = await db.findPokemonById(pokemonId);
  let arr = {}
  newPokemon.forEach((row, i) => {
    let obj = {
        id: row.id,
        name: row.pokemon_name,
        imageurl: row.imageurl,
        type: row.type_name,
      };
      if (arr[row.id]) {
        arr[row.id].type.push(row.type_name);
    } else {
        arr[row.id] = obj;
        arr[row.id].type = [row.type_name];
    }
    });
    obj = (Object.values(arr))[0];
  res.render("pokemonId", { obj });
};

findTrainer = async (req, res) => {
  const { trainerId } = req.params;
  const newTrainer = await db.findTrainerById(trainerId);
  let arr = {};
  newTrainer.forEach((row, i) => {
    if (!arr[row.id]) {
      arr[row.id] = {
        id: row.id,
        name: row.trainer_name,
        imageUrl: row.imageurl,
        pokemon: {},
      };
    }
    if (arr[row.id].pokemon[row.pokemon_id]) {
      arr[row.id].pokemon[row.pokemon_id].type.push(row.type_name);
    } else {
      arr[row.id].pokemon[row.pokemon_id] = {
        id: row.pokemon_id,
        name: row.pokemon_name,
        imageUrl: row.pokemon_imageurl,
        level: row.levels,
        hp: row.hp,
        status: row.status_pokemon,
        type: [row.type_name],
      };
    }
  });
  const trainer = Object.values(arr).map((t) => ({
    ...t,
    pokemon: Object.values(t.pokemon),
  }))[0];

  const allPokemon = await db.getAllPokemon();
  let pArr = {};
  allPokemon.forEach((row, i) => {
    let obj = {
      id: row.id,
      name: row.pokemon_name,
      imageurl: row.imageurl,
      type: row.type_name,
    };
    if (pArr[row.id]) {
      pArr[row.id].type.push(row.type_name);
    } else {
      pArr[row.id] = obj;
      pArr[row.id].type = [row.type_name];
    }
  });
  const pokemon = Object.values(pArr);
  res.render("trainerId", { trainer, pokemon });
};

deletePokemonFromTrainer = async (req, res) => {
  const trainerId = req.params.trainerId;
  const pokemonId = req.params.id;
  try {
    await db.deletePokemonFromTrainer(trainerId,pokemonId)
    res.redirect(`/trainer/${trainerId}`);
  } catch (error) {
    renderDbError(res, "remove the Pokemon from the trainer", error);
  }
};

deletePokemon = async (req, res) => {
  const { pokemonId } = req.params;
  try {
    await db.deletePokemon(pokemonId)
    res.redirect("/pokemon");
  } catch (error) {
    renderDbError(res, "delete the Pokemon", error);
  }
};

addPokemonToTrainer = [validateAddPokemon, async (req,res)=> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return renderError(res, 400, errors.array());
  }
  const pokemonIdArr = [].concat(req.body.pokemon)
  const trainerId = req.params.trainerId
  try {
    await db.addPokemonToTrainer(pokemonIdArr,trainerId)
    res.redirect("/trainer")
  } catch (error) {
    renderDbError(res, "add the Pokemon to the trainer", error);
  }
}];

deleteTrainer = async (req,res) => {
  const trainerId= req.params.trainerId
  try {
    await db.deleteTrainer(trainerId)
    res.redirect("/trainer")
  } catch (error) {
    renderDbError(res, "delete the trainer", error);
  }
}

reDirectToNewPokemon = async (req,res)=>{
  const types = (await db.getAllTypes()).rows
  res.render('newPokemon',{ types })
}

createNewTrainer = async (req,res) => {
  const pokemon = await db.getAllPokemon()
  res.render('newTrainer', { pokemon })
}
module.exports = {
  createTrainer,
  createPokemon,
  viewPokemon,
  viewTrainer,
  viewType,
  findPokemon,
  findTrainer,
  deletePokemonFromTrainer,
  deletePokemon,
  getAllPokemon,
  getAllTrainers,
  getAllTypes,
  getAllCount,
  addPokemonToTrainer,
  deleteTrainer,
  reDirectToNewPokemon
};
