import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import Input from "./Input";
import Select from "./Select";

import { Pokemon } from "../App";
import Modal from "./Modal";

interface FormProps {
  setPokemonsError: (error: boolean) => void;
  setSelectedPokemons: (pokemons: Pokemon[]) => void;
  pokemonNameFilter: string;
  setPokemonNameFilter: (filter: string) => void;
  filteredPokemons: Pokemon[];
  selectedPokemons: Pokemon[];
  pokemonsError: boolean;
}

export interface FormData {
  firstName: string;
  lastName: string;
  pokemons: Pokemon[];
}

export default function Form({
  setPokemonsError,
  setSelectedPokemons,
  pokemonNameFilter,
  setPokemonNameFilter,
  filteredPokemons,
  selectedPokemons,
  pokemonsError,
}: FormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const [modalOpen, setModalOpen] = useState(false);

  const onSubmit = (data: FormData) => {
    if (data.pokemons.length < 4) {
      setPokemonsError(true);
      return;
    }
    setPokemonsError(false);
    setModalOpen(true);
  };

  useEffect(() => {
    setValue("pokemons", selectedPokemons);
  }, [selectedPokemons, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          id={"firstName"}
          register={register}
          label={"First Name"}
          error={errors.firstName?.message}
        />

        <Input
          id={"lastName"}
          register={register}
          label={"Last Name"}
          error={errors.lastName?.message}
        />

        <Select
          label={"Train your Pokémons"}
          pokemonNameFilter={pokemonNameFilter}
          setPokemonNameFilter={setPokemonNameFilter}
          options={filteredPokemons}
          setSelectedPokemons={setSelectedPokemons}
          selectedPokemons={selectedPokemons}
          pokemonsError={pokemonsError}
        />

        <div className="text-center">
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            Start Training
          </button>
        </div>
      </form>
      {modalOpen && (
        <Modal
          selectedPokemons={selectedPokemons}
          setModalOpen={setModalOpen}
          setSelectedPokemons={setSelectedPokemons}
          resetForm={reset}
        />
      )}
    </>
  );
}
