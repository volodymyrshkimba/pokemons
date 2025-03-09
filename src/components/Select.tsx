import { useState } from "react";
import clsx from "clsx";

import { Pokemon } from "../App";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

interface SelectProps {
  options: Pokemon[];
  selectedPokemons: Pokemon[];
  setSelectedPokemons: (pokemons: Pokemon[]) => void;
  pokemonNameFilter: string;
  setPokemonNameFilter: (filter: string) => void;
  label: string;
  pokemonsError: boolean;
}

export default function Select({
  options,
  selectedPokemons,
  setSelectedPokemons,
  pokemonNameFilter,
  setPokemonNameFilter,
  label,
  pokemonsError,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex-col  gap-1 relative">
      <p className="font-medium">{label}</p>
      <div className="flex justify-between items-center h-8 py-2 px-3 relative rounded-[4px] border">
        <div className="overflow-x-auto whitespace-nowrap">
          {selectedPokemons.length === 0
            ? "Select"
            : selectedPokemons.map((item) => {
                return (
                  <span
                    className="bg-gray-200 inline-flex justify-center gap-1 items-center mr-1 last:mr-0 rounded-lg px-1"
                    key={item.name}
                  >
                    {item.name}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPokemons(
                          selectedPokemons.filter((pokemon) => {
                            return pokemon.name !== item.name;
                          })
                        );
                      }}
                    >
                      <XMarkIcon className="size-4 text-black-500" />
                    </button>
                  </span>
                );
              })}
        </div>
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? (
            <ChevronUpIcon className="size-6 text-black-500" />
          ) : (
            <ChevronDownIcon className="size-6 text-black-500" />
          )}
        </div>

        <ul
          className={clsx(
            "absolute top-[110%] w-full left-0 h-[400px] overflow-hidden overflow-y-auto bg-white",
            !isOpen && "invisible opacity-0"
          )}
        >
          <li>
            <input
              type="text"
              name="pokemonNameFilter"
              value={pokemonNameFilter}
              placeholder="find by name"
              className="rounded-[4px] border w-full px-2"
              onChange={(e) => {
                setPokemonNameFilter(e.target.value);
              }}
            />
          </li>
          {options.map((item) => {
            return (
              <li
                className="pl-4 border-b-1"
                key={item.name}
                onClick={() => {
                  if (selectedPokemons.length === 4) return;
                  const isSelected = selectedPokemons.find(
                    (pokemon) => pokemon.name === item.name
                  );
                  if (isSelected) return;
                  setSelectedPokemons([...selectedPokemons, item]);
                }}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
      {pokemonsError && (
        <p className="text-red-500 text-sm mt-1 absolute left-0 bottom-[-18px] -z-10">
          Your team must be filled with at least 4 Pokémon
        </p>
      )}
    </div>
  );
}
