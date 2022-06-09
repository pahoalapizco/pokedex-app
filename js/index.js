// window.addEventListener('DOMContentLoaded', getPokemon, false);
const MIN_POKEMON_ID = 1;
const MAX_POKEMON_ID = 150;
let currentPokemonId =0;

const reload = (pokemon) => {
  imgElement.src = pokemon.img;
  imgElement.setAttribute("alt", pokemon.name);
  pokemonNameH2Element.innerHTML = `
    ${pokemon.name}
    <span> ${pokemon.hp}hp</span>
  `;
  pokemonExpElement.textContent = `${pokemon.experience} exp`;

  const types = pokemon.types.map(({ type }) => {
    const spanType = document.createElement("span");
    spanType.innerText = type.name;
    return spanType;
  });
  pokemonTypesElement.innerHTML = "";
  pokemonTypesElement.append(...types);

  statContainer[0].textContent = pokemon.attack;
  statContainer[1].textContent = pokemon.specialAttack;
  statContainer[2].textContent = pokemon.defense;
}

async function getPokemon(pokemonId) {
  const randomPokemonId = pokemonId || random(MIN_POKEMON_ID, MAX_POKEMON_ID);
  const { data: pokemon } = await api.get(`/${randomPokemonId}`);
  currentPokemonId = pokemon.id;

  const pokemonObj = {
    img: pokemon.sprites.other.dream_world.front_default,
    name: pokemon.forms[0].name,
    hp: pokemon.stats[0].base_stat,
    experience: pokemon.base_experience,
    types: pokemon.types,
    attack: pokemon.stats[1].base_stat,
    defense: pokemon.stats[2].base_stat,
    specialAttack: pokemon.stats[3].base_stat,
  };
  reload(pokemonObj);
}

const onClickPrev = () => {
  const nextPokemonId = currentPokemonId === MIN_POKEMON_ID ? 150 : currentPokemonId -1;
  getPokemon(nextPokemonId);  
}
const onClicknext = () => {
  const nextPokemonId = currentPokemonId === MAX_POKEMON_ID ? 1 : currentPokemonId +1;
  getPokemon(nextPokemonId);  
}


getPokemon();