import { useEffect } from "react";
import { DefaultValues } from "react-hook-form";

import PokemonCard from "./PokemonCard";

import { XMarkIcon } from "@heroicons/react/24/solid";

import { Pokemon } from "../App";
import { FormData } from "./Form";

type ResetForm = (
  values?: DefaultValues<FormData>,
  options?: {
    keepErrors?: boolean;
    keepDirty?: boolean;
    keepValues?: boolean;
    keepIsSubmitted?: boolean;
    keepTouched?: boolean;
    keepIsValid?: boolean;
    keepDefaultValues?: boolean;
  }
) => void;

interface ModalProps {
  selectedPokemons: Pokemon[];
  setModalOpen: (isopen: boolean) => void;
  setSelectedPokemons: (pokemons: Pokemon[]) => void;
  resetForm: ResetForm;
}

export default function Modal({
  selectedPokemons,
  setModalOpen,
  setSelectedPokemons,
  resetForm,
}: ModalProps) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest(".modal") === null) {
        setModalOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setModalOpen]);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 last:mb-0 ">
      <div className="bg-white p-6 rounded-lg shadow-lg relative max-h-[95vh] overflow-y-auto modal">
        <p className="text-2xl font-semibold  text-gray-800 mb-4">
          Your Pokémon Team
        </p>
        <button
          onClick={() => {
            setModalOpen(false);
          }}
          type="button"
          className="absolute top-6 right-6"
        >
          <XMarkIcon className="size-6 text-black-500" />
        </button>
        <ul className="space-y-4 overflow-auto ">
          {selectedPokemons.map((pokemon) => {
            return <PokemonCard key={pokemon.name} pokemon={pokemon} />;
          })}
        </ul>
        <div className="flex justify-end gap-4 ">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
            className="font-semibold"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setModalOpen(false);
              setSelectedPokemons([]);
              resetForm();
            }}
            className="bg-purple-600 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 py-1 px-4 rounded-md"
            type="button"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
