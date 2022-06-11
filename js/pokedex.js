let nextLimitOffset = 'limit=20&offset=0';

const generateTypes = (pokemonTypes) => {
  const pElementTypes = document.createElement("p");
  pElementTypes.classList.add("pokemon-types");

  const types = pokemonTypes.map(({ type }) => {
    const spanType = document.createElement("span");
    spanType.innerText = type.name;
    spanType.style.backgroundColor = `var(--${type.name}-type)`;
    return spanType;
  });
  pElementTypes.appendChild(...types);
  return pElementTypes;
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
  const types = generateTypes(pokemonData.types);
  
  article.appendChild(types);
  return article;
}

const reloadPokemonsPreview = async () => {
  const { data: pokemons } = await api.get(`?${nextLimitOffset}`);
  nextLimitOffset = pokemons.next.split('?')[1];

  const articles = await Promise.all(pokemons.results.map(async (pokemon) => await setPokemonPreviewCard(pokemon.url)));
  pokemonListPreviewSect.append(...articles);
}

/* Click events */
const loadMore = async () => {
  event.preventDefault();
  await reloadPokemonsPreview();
}

reloadPokemonsPreview();