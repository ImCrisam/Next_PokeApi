export const statNames = ['attack', 'defense', 'special_attack', 'special_defense', 'speed'] as const;

export type StatDescription = {
  texto: string;
  icono: string;
};
export interface StatDescriptionPokemon extends StatDescription{
  tier:number
}

export type StatName = typeof statNames[number];
export type StatType = 'positive' | 'negative';
export type countDescriptiosByStats = 1 | 2 | 3
export type StatGroup = Record<StatType, Record<countDescriptiosByStats, StatDescription>>;

export interface StatDescriptions {
  ranges: number[];
  stats: Record<StatName, StatGroup>;
}
