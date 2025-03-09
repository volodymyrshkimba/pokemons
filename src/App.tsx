import { useEffect, useMemo, useState } from "react";

import axios from "axios";

import Form from "./components/Form";

export interface Pokemon {
  name: string;
  url: string;
}

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>([]);
  const [pokemonNameFilter, setPokemonNameFilter] = useState<string>("");
  const [pokemonsError, setPokemonsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const { data } = await axios.get<{ results: Pokemon[] }>(
          "https://pokeapi.co/api/v2/pokemon"
        );
        setPokemons(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(pokemonNameFilter.toLowerCase())
    );
  }, [pokemons, pokemonNameFilter]);

  return (
    <main>
      <div className="max-w-[400px] ml-auto mr-auto pt-5">
        <Form
          setPokemonsError={setPokemonsError}
          setSelectedPokemons={setSelectedPokemons}
          pokemonNameFilter={pokemonNameFilter}
          setPokemonNameFilter={setPokemonNameFilter}
          filteredPokemons={filteredPokemons}
          selectedPokemons={selectedPokemons}
          pokemonsError={pokemonsError}
        />
      </div>
    </main>
  );
}

export default App;
