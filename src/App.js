import { useEffect, useState } from 'react';
import './App.css';
import {getPokemonData as getAllPokemon, getPokemon} from "./utils/pokemon";
import { Card } from './Components/Card/Card';
import { NavBar } from './Components/NavBar/NavBar';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon/";
  
  const[loading, setLoading] = useState(true);
  const[pokemonData, setPokemonData] = useState([]);
  const[nextUrl, setNextUrl] = useState("");
  const[prevUrl, setPrevUrl] = useState("");


  useEffect(() => {
    const fetchPokemonData = async () => {
      // すべてのポケモンデータを取得
      let res = await getAllPokemon(initialURL);

      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setNextUrl(res.next);
      setPrevUrl(res.previous);

      console.log(res);
      
      setLoading(false);
    }

    fetchPokemonData();

  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    )

    setPokemonData(_pokemonData);
  };

  // console.log(pokemonData);

  const handlePrevPage = async () => {
    if(!prevUrl) return;

    setLoading(true);

    let res = await getAllPokemon(prevUrl);

    //各ポケモンの詳細なデータを取得
    loadPokemon(res.results);
    setNextUrl(res.next);
    setPrevUrl(res.previous);

    setLoading(false);

  };

  const handleNextPage = async () => {
    setLoading(true);

    let res = await getAllPokemon(nextUrl);

    //各ポケモンの詳細なデータを取得
    loadPokemon(res.results);
    setNextUrl(res.next);
    setPrevUrl(res.previous);

    setLoading(false);
  };

  return (
    <>
      <NavBar />
      <div className="App">
        {loading ? (
          <h1>ロード中・・・</h1>
          ) : (
            <>
              <div className="btn">
                <button onClick={handlePrevPage}>前へ</button>
                <button onClick={handleNextPage}>次へ</button>
              </div>
              <div className="pokemonCardContainer">
                {
                  pokemonData.map((pokemon, i) => {
                    return <Card  key={i} pokemon={pokemon}/>
                  })
                }
              </div>
            </>
          )}
      </div>
    </>
  );
}

export default App;
