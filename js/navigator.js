btnSearch.addEventListener("click", () => {
  location.hash = `#search=${inputSearch.value}`;
});

btnLeftDetail.addEventListener("click", () => {
  if(currentPokemonId > 0) {
    location.hash = `#search=${currentPokemonId--}`;
  }
  return;
});
btnRightDetail.addEventListener("click", () => {
  if(currentPokemonId >= 0) {
    location.hash = `#search=${currentPokemonId++}`;
  }
  return;
});

window.addEventListener("DOMContentLoaded", navigator, true);
window.addEventListener("hashchange", navigator, true);

function navigator() {
  const locationHash = location.hash.toLocaleLowerCase();
  window.scrollTo(0, 0);

  if(locationHash.startsWith("#search=")) {
    searchPage(locationHash);                
    console.log('Search');
  } else {
    homePage();
  }
}

function homePage() {
  /* Home.. */
  pokemonListPreviewSect.classList.remove("inactive");
  btnLoadMore.classList.remove("inactive");

  /* Detail */
  sectionPokemonDetail.classList.add("inactive");
  btnContainerDetail.classList.add("inactive");
  btnLeftDetail.classList.add("inactive");
  btnRightDetail.classList.add("inactive");

  reloadPokemonsPreview();
  currentPokemonId = 0;
}

function searchPage(locationHash) {
  /* Detail */
  sectionPokemonDetail.classList.remove("inactive");
  btnContainerDetail.classList.remove("inactive");
  btnLeftDetail.classList.remove("inactive");
  btnRightDetail.classList.remove("inactive");

  /* Home.. */
  pokemonListPreviewSect.classList.add("inactive");
  btnLoadMore.classList.add("inactive");
  const pokemonNameOrId = locationHash.split("=").reverse()[0];

  getPokemon(pokemonNameOrId);
}