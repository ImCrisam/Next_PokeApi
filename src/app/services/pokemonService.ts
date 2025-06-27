import { Pokemon } from "../types/Pokemon";
import { pokemonAdapter } from "../adapters/pokemonAdapter";

export const fetchAllPokemons = async (): Promise<Pokemon[]> => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const list = await res.json();

  const pokemons: Pokemon[] = await Promise.all(
    list.results.map(async (pokemon: any) => {
      const detailRes = await fetch(pokemon.url);
      const detail = await detailRes.json();
      return pokemonAdapter(detail);
    })
  );

  console.log("Pokémons cargados:", pokemons);

  return pokemons;
};
