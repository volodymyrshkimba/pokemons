import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";
import Select from "../components/Select";
import { Pokemon } from "../App";

const options = [
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
  { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
  { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
  { name: "charmeleon", url: "https://pokeapi.co/api/v2/pokemon/5/" },
  { name: "charizard", url: "https://pokeapi.co/api/v2/pokemon/6/" },
  { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
  { name: "wartortle", url: "https://pokeapi.co/api/v2/pokemon/8/" },
  { name: "blastoise", url: "https://pokeapi.co/api/v2/pokemon/9/" },
  { name: "caterpie", url: "https://pokeapi.co/api/v2/pokemon/10/" },
  { name: "metapod", url: "https://pokeapi.co/api/v2/pokemon/11/" },
];

interface Args {
  label: string;
  pokemonsError: boolean;
}

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
};

export default meta;

const Template = (args: Args) => {
  const [pokemons] = useState<Pokemon[]>(options);
  const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>([]);
  const [pokemonNameFilter, setPokemonNameFilter] = useState("");

  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(pokemonNameFilter.toLowerCase())
    );
  }, [pokemons, pokemonNameFilter]);

  return (
    <Select
      {...args}
      options={filteredPokemons}
      selectedPokemons={selectedPokemons}
      setSelectedPokemons={setSelectedPokemons}
      pokemonNameFilter={pokemonNameFilter}
      setPokemonNameFilter={setPokemonNameFilter}
    />
  );
};

export const Default = Template.bind({});

// @ts-ignore
Default.args = {
  label: "Choose your Pokémon",
  pokemonsError: false,
};
