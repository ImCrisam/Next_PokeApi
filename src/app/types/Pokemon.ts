export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  order: number;
  is_default: boolean;
  location_area_encounters: string;

  // Sprites principales
  sprite_front_default: string | null;
  sprite_front_shiny: string | null;
  sprite_front_female: string | null;
  sprite_front_shiny_female: string | null;
  sprite_home_default: string | null;
  sprite_home_shiny: string | null;
  sprite_home_female: string | null;
  sprite_home_shiny_female: string | null;
  sprite_official_artwork_default: string | null;
  sprite_official_artwork_shiny: string | null;
  sprite_dream_world_default: string | null;
  sprite_dream_world_female: string | null;
  sprite_showdown_front_default: string | null;
  sprite_showdown_front_female: string | null;
  sprite_showdown_front_shiny: string | null;
  sprite_showdown_front_shiny_female: string | null;
  sprite_generation_iv_diamond_pearl_front_default: string | null;
  sprite_generation_iv_diamond_pearl_front_female: string | null;
  sprite_generation_iv_diamond_pearl_front_shiny: string | null;
  sprite_generation_iv_diamond_pearl_front_shiny_female: string | null;
  sprite_generation_viii_icons_front_default: string | null;

  // Cries
  cry_latest: string | null;
  cry_legacy: string | null;

  // Stats aplanadas
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;

  // Arrays originales
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
}

export interface PokemonTypeInfo {
    nameLocal: string;
    color: string;
}