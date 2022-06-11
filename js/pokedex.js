let nextLimitOffset = 'limit=20&offset=0';
const cleanElements = () => {
  h2PokemonNameDetail.innerHTML = "";
  imgPokemonDetail.src = "";
  imgPokemonDetail.alt = "";
  pPokemonExpDetail.innerHTML = "";
  pPokemonTypesDetail.innerHTML = "";
}

const generateTypes = (pokemonTypes, container) => {
  const types = pokemonTypes.map(({ type }) => {
    const spanType = document.createElement("span");
    spanType.innerText = type.name;
    spanType.style.backgroundColor = `var(--${type.name}-type)`;
    return spanType;
  });
  container.appendChild(...types);
  return container;
}

const generateImage = (pokemon, cssClass) => {
  const imgElement = document.createElement("img");
  imgElement.setAttribute("src", pokemon.image);
  imgElement.setAttribute("alt", pokemon.name);
  imgElement.classList.add(cssClass);
  return imgElement;
}

const setPokemonPreviewCard = async (apiUrl) => {
  const { data: pokemonData } = await axios.get(apiUrl);
  // container
  const article = document.createElement("article");
  article.classList.add("pokemon-img-container");
  
  // name and id
  const nameH3 = document.createElement("h3");
  nameH3.classList.add("pokemon-name");
  nameH3.innerText = pokemonData.name;
  const spanId = document.createElement("span");
  spanId.innerText = `#${padLeft(pokemonData.id)}`;
  nameH3.appendChild(spanId);

  article.appendChild(nameH3);
  // image 
  const imgElement = generateImage({
    image: pokemonData.sprites.other.dream_world.front_default,
    name: pokemonData.name,
  }, "pokemon-img");
  article.appendChild(imgElement);
  
  // Types
  
  const pElementTypes = document.createElement("p");
  pElementTypes.classList.add("pokemon-types");
  const types = generateTypes(pokemonData.types, pElementTypes);
  
  article.appendChild(types);
  return article;
}

const setPokemonCardDetail = (pokemon) => {
  cleanElements();
  // Image
  imgPokemonDetail.src = pokemon.img;
  //name and exp
  h2PokemonNameDetail.innerText = pokemon.name;
  const spanExp = document.createElement("span");
  spanExp.innerText = `${pokemon.hp}hp`;
  h2PokemonNameDetail.appendChild(spanExp);

  // types
  generateTypes(pokemon.types, pPokemonTypesDetail);
  cardBackGroundDetail.style.backgroundColor = `var(--${pokemon.types[0].type.name}-type)`;
  // stats
  statPokemonContainer[0].textContent = pokemon.attack;
  statPokemonContainer[1].textContent = pokemon.specialAttack;
  statPokemonContainer[2].textContent = pokemon.defense;

}

const reloadPokemonsPreview = async () => {
  const { data: pokemons } = await api.get(`?${nextLimitOffset}`);
  nextLimitOffset = pokemons.next.split('?')[1];

  const articles = await Promise.all(pokemons.results.map(async (pokemon) => await setPokemonPreviewCard(pokemon.url)));
  pokemonListPreviewSect.append(...articles);
}

const getPokemon = async (pokemonNameOrId)  => {
  try {    
    const { data: pokemon } = await api.get(`/${pokemonNameOrId}`);
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
    setPokemonCardDetail(pokemonObj);

  } catch (error) {
    console.log("🚀 ~ file: pokedex.js ~ line 68 ~ getPokemon ~ error", error);
  }
  
}
/* Click events */
const loadMore = async () => {
  event.preventDefault();
  await reloadPokemonsPreview();
}
