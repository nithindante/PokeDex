const types = [
    { id: '001', name: "Grass" },
    { id: '002', name: "Fire" },
    { id: '003', name: "Water" },
    { id: '004', name: "Electric" },
    { id: '005', name: "Normal" },
    { id: '006', name: "Psychic" },
    { id: '007', name: "Fighting" },
    { id: '008', name: "Ghost" },
    { id: '009', name: "Poison" },
    { id: '010', name: "Fairy" }
].map((type) => ({
    ...type,
    imageUrl: `https://play.pokemonshowdown.com/sprites/types/${type.name}.png`,
}))

const findType = (name) => types.find((type) => type.name === name)

const pokemon = [
    { id: '001', name: "Bulbasaur", imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", type: [findType("Grass"), findType("Poison")], level: 16, hp: 82, status: null },
    { id: '004', name: "Charmander", imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", type: [findType("Fire")], level: 14, hp: 75, status: null },
    { id: '007', name: "Squirtle", imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png", type: [findType("Water")], level: 15, hp: 90, status: "Traded away" },
    { id: '025', name: "Pikachu", imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png", type: [findType("Electric")], level: 20, hp: 95, status: null },
    { id: '039', name: "Jigglypuff", imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png", type: [findType("Normal"), findType("Fairy")], level: 12, hp: 70, status: null },
    { id: '052', name: "Meowth", imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png", type: [findType("Normal")], level: 13, hp: 65, status: null },
    { id: '063', name: "Abra", imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/63.png", type: [findType("Psychic")], level: 11, hp: 55, status: null },
    { id: '066', name: "Machop", imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/66.png", type: [findType("Fighting")], level: 17, hp: 88, status: null },
    { id: '092', name: "Gastly", imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png", type: [findType("Ghost"), findType("Poison")], level: 14, hp: 60, status: null },
    { id: '133', name: "Eevee", imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png", type: [findType("Normal")], level: 18, hp: 80, status: null }
]

const trainers = [
    { id: '001', name: "Ash Ketchum", pokemon: [pokemon[0], pokemon[1], pokemon[2]] },
    { id: '002', name: "Misty", pokemon: [pokemon[3], pokemon[4], pokemon[5]] },
    { id: '003', name: "Brock", pokemon: [pokemon[6], pokemon[7], pokemon[8]] },
    { id: '004', name: "Gary Oak", pokemon: [pokemon[9], pokemon[0], pokemon[1]] },
].map((trainer) => ({
    ...trainer,
    imageUrl: `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(trainer.name)}`,
}))

module.exports = { pokemon, trainers, types };