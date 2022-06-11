let currentPokemonId = 0;

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

function padLeft(numeber) {
  return ('00'+numeber).slice(-3);
}

/* HTML Elements */
const imgElement = document.getElementById("pokemon-img");
const pokemonNameH2Element = document.getElementById("pokemon-name");
const pokemonExpElement = document.getElementById("pokemon-exp");
const pokemonTypesElement = document.getElementById("pokemon-types");
const statContainer = document.querySelectorAll(".card-fotter--stats h4");
const cardBackGroundDiv = document.querySelector(".card-background");


/* HTML Elements - pokedex.html */
const pokemonListPreviewSect = document.getElementById("pokemonListPreview");
const btnLoadMore = document.getElementById("btnLoadMore");
const inputSearch = document.getElementById("searchInput");
const btnSearch = document.getElementById("searchButton");

/* Pokemon detail */
const sectionPokemonDetail = document.getElementById("pokemon-detail");
const imgPokemonDetail = document.getElementById("pokemon-card-image");
const h2PokemonNameDetail = document.getElementById("pokemon-name");
const pPokemonExpDetail = document.getElementById("pokemon-exp");
const pPokemonTypesDetail = document.getElementById("pokemon-types");
const statPokemonContainer = document.querySelectorAll(".card-fotter--stats h4");
const cardBackGroundDivDetail = document.querySelector(".card-background");
const btnContainerDetail = document.getElementById("button-container-detail");
const btnLeftDetail = document.getElementById("btnLeft");
const btnRightDetail = document.getElementById("btnRight");
const cardBackGroundDetail = document.querySelector(".card-background");
const btnBackDetail = document.getElementById("btnBack");