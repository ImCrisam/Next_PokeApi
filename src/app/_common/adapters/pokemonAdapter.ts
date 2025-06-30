import { Pokemon } from "../../_types/Pokemon";
import { colours, getColor } from "../utils/colorsTypes";

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



  // Cries
  cry_latest: raw.cries?.latest ?? null,
  cry_legacy: raw.cries?.legacy ?? null,

  // Stats aplanadas
  hp: statsMap.hp ?? 0,

  // Stats aplanados
  attack: statsMap.attack ?? 0,
  defense: statsMap.defense ?? 0,
  special_attack: statsMap.special_attack ?? 0,
  special_defense: statsMap.special_defense ?? 0,
  speed: statsMap.speed ?? 0,
  stat_max: Math.max(
    statsMap.attack ?? 0,
    statsMap.defense ?? 0,
    statsMap.special_attack ?? 0,
    statsMap.special_defense ?? 0,
    statsMap.speed ?? 0
  ),
  stat_min: Math.min(
    statsMap.attack ?? 0,
    statsMap.defense ?? 0,
    statsMap.special_attack ?? 0,
    statsMap.special_defense ?? 0,
    statsMap.speed ?? 0
  ),

  // Arrays originales
  types: raw.types.map(({ slot, type }: any) => ({
    slot: slot ?? 0,
    type: {
      name: type?.name ?? "",
      url: type?.url ?? "",
      color: getColor(type?.name ?? ""),
      liteColor: getColor(type?.name ?? "", "lite"),
      darkColor: getColor(type?.name ?? "", "dark"),
    }
  })),

    // Sprites principales
  sprite_front_default: raw.sprites?.front_default ?? null,
  sprite_front_female: raw.sprites?.front_female ?? null,
  sprite_front_shiny: raw.sprites?.front_shiny ?? null,
  sprite_front_shiny_female: raw.sprites?.front_shiny_female ?? null,
  sprite_home_default: raw.sprites?.other?.home?.front_default ?? null,
  sprite_home_female: raw.sprites?.other?.home?.front_female ?? null,
  sprite_home_shiny: raw.sprites?.other?.home?.front_shiny ?? null,
  sprite_home_shiny_female: raw.sprites?.other?.home?.front_shiny_female ?? null,
  sprite_official_artwork_default: raw.sprites?.other?.["official-artwork"]?.front_default ?? null,
  sprite_official_artwork_shiny: raw.sprites?.other?.["official-artwork"]?.front_shiny ?? null,
  sprite_dream_world_default: raw.sprites?.other?.["dream_world"]?.front_default??null,
  sprite_dream_world_female: raw.sprites?.other?.["dream_world"]?.front_female??null,
  sprite_showdown_front_default: raw.sprites?.other?.["showdown"]?.front_default??null,
  sprite_showdown_front_female: raw.sprites?.other?.["showdown"]?.front_female??null,
  sprite_showdown_front_shiny: raw.sprites?.other?.["showdown"]?.front_shiny??null,
  sprite_showdown_front_shiny_female: raw.sprites?.other?.["showdown"]?.front_shiny_female??null,
  sprite_generation_iv_diamond_pearl_front_default: raw.sprites?.versions?.["generation-iv"]?.front_default??null,
  sprite_generation_iv_diamond_pearl_front_female: raw.sprites?.versions?.["generation-iv"]?.front_female??null,
  sprite_generation_iv_diamond_pearl_front_shiny: raw.sprites?.versions?.["generation-iv"]?.front_shiny??null,
  sprite_generation_iv_diamond_pearl_front_shiny_female: raw.sprites?.versions?.["generation-iv"]?.front_shiny_female??null,
  sprite_generation_viii_icons_front_default: raw.sprites?.versions?.["generation-viii"]?.front_default??null,

  // Abilities
  abilities: Array.isArray(raw.abilities)
    ? raw.abilities.map((a: any) => ({
        ability: {
          name: a.ability?.name ?? "",
          url: a.ability?.url ?? ""
        },
        is_hidden: a.is_hidden ?? false,
        slot: a.slot ?? 0
      }))
    : []
 
};
}