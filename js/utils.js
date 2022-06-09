const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

function random(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}

/* HTML Elements */
const imgElement = document.getElementById("pokemon-img");
const pokemonNameH2Element = document.getElementById("pokemon-name");
const pokemonExpElement = document.getElementById("pokemon-exp");
const pokemonTypesElement = document.getElementById("pokemon-types");
const statContainer = document.querySelectorAll(".card-fotter--stats h4");