const path = require("node:path");
const express = require("express");
const homeRouter = require("./routes/homeRouter");
const pokemonRouter = require("./routes/pokemonRouter");
const trainerRouter = require("./routes/trainerRouter");
const typeRouter = require("./routes/typeRouter");
const newPokemonRouter = require('./routes/newPokemonRouter')
const newTrainerRouter = require('./routes/newTrainerRouter')
const pokemonDetailRouter = require('./routes/pokemonDetailRouter')
const trainerDetailsRouter = require('./routes/trainerDetailsRouter')
const app = express();
const PORT = 4000;
const assetsPath = path.join(__dirname + "/public");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use('/',homeRouter)
app.use('/pokemon',pokemonRouter)
app.use('/pokemon/new',newPokemonRouter)
app.use('/pokemon/:pokemonId',pokemonDetailRouter)
app.use('/trainer/new',newTrainerRouter)
app.use('/trainer/:trainerId', trainerDetailsRouter)
// app.use('trainer/:trainerId/:pokemonId',trainerDetailsRouter)
app.use('/trainer',trainerRouter)
app.use('/type',typeRouter)
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Pokedex loading up!`);
});