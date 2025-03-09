import axios from "axios";
import { useEffect, useState } from "react";

export default function PokemonCard({ pokemon }) {
  const [pokemonInfo, setPokemonInfo] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const { data } = await axios.get(pokemon.url);

        setPokemonInfo(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <li className="flex justify-center items-center bg-white px-10 rounded-lg shadow-md gap-20">
      {pokemonInfo !== null && (
        <img
          className="w-full h-32 object-cover rounded-md mb-3"
          src={pokemonInfo.sprites.front_default || ""}
          alt={pokemon.name}
        />
      )}

      <p className="text-center text-lg font-semibold text-gray-700">
        {pokemon.name}
      </p>
    </li>
  );
}
