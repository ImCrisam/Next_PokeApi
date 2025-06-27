import { Pokemon } from "../types/Pokemon";

export function pokemonAdapter(raw: any): Pokemon {
  // Extraer stats aplanados
  const statsMap: Record<string, number> = {};
  if (Array.isArray(raw.stats)) {
    raw.stats.forEach((statObj: any) => {
      const statName = statObj.stat.name.replace("-", "_");
      statsMap[statName] = statObj.base_stat;
    });
  }

  return {
    id: raw.id,
    name: raw.name,
    base_experience: raw.base_experience,
    height: raw.height,
    weight: raw.weight,
    order: raw.order,
    is_default: raw.is_default,
    location_area_encounters: raw.location_area_encounters,

    // Sprites principales
    sprite_front_default: raw.sprites?.front_default ?? null,
    sprite_front_shiny: raw.sprites?.front_shiny ?? null,
    sprite_home_default: raw.sprites?.other?.home?.front_default ?? null,
    sprite_home_shiny: raw.sprites?.other?.home?.front_shiny ?? null,
    sprite_official_artwork_default: raw.sprites?.other?.["official-artwork"]?.front_default ?? null,
    sprite_official_artwork_shiny: raw.sprites?.other?.["official-artwork"]?.front_shiny ?? null,

    // Cries
    cry_latest: raw.cries?.latest ?? null,
    cry_legacy: raw.cries?.legacy ?? null,

    // Stats aplanadas
    hp: statsMap.hp ?? 0,
    attack: statsMap.attack ?? 0,
    defense: statsMap.defense ?? 0,
    special_attack: statsMap.special_attack ?? 0,
    special_defense: statsMap.special_defense ?? 0,
    speed: statsMap.speed ?? 0,

    // Arrays originales
    abilities: raw.abilities ?? [],
    types: raw.types ?? [],
  };
}