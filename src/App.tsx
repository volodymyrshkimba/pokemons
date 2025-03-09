import { useEffect, useState } from "react";
import axios from "axios";
import Select from "./components/Select";

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon");
      setPokemons(data.results);
    };

    fetchPokemons();
  }, []);

  return (
    <main>
      <Select options={pokemons} />
    </main>
  );
}

export default App;
