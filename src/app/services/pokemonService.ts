
import { Pokemon } from "../models/Pokemon";

export const fetchAllPokemons = async (): Promise<Pokemon[]> => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const list = await res.json();

  const pokemons: Pokemon[] = await Promise.all(
    list.results.map(async (pokemon: any) => {
      const detailRes = await fetch(pokemon.url);
      const detail = await detailRes.json();

      return {
        id: detail.id,
        name: detail.name,
        types: detail.types.map((t: any) => t.type.name),
        stats: detail.stats.map((s: any) => ({
          name: s.stat.name,
          base_stat: s.base_stat,
        })),
        base_experience: detail.base_experience,
        height: detail.height / 10, // Convertimos a metros
        weight: detail.weight / 10, // Convertimos a kg
        sprite: detail.sprites.front_default,
        abilities: detail.abilities.map((a: any) => a.ability.name),
      };
    })
  );
  console.log("Pokémons cargados:", {...pokemons});
  

  return pokemons;
};
