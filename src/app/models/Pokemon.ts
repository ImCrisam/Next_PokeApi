export type PokemonStat = {
  name: string;
  base_stat: number;
};

export type Pokemon = {
  id: number;
  name: string;
  types: string[];
  stats: PokemonStat[];
  height: number; // metros
  weight: number; // kg
  sprite: string;
  abilities: string[];
  base_experience: number; 
};

export type PokemonDescription = {
  flavorText: string;
  language: string;
};

export type PokemonEvolution = {
  from: string | null;
  to: string[];
};
