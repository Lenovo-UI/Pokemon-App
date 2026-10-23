
export const getPokemonData = (url) => {
  return new Promise((resolve, reject) => {
      fetch(url)
        .then((response)=> response.json())
        .then((data)=> resolve(data));
      });
};

export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
};


