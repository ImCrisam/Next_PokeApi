export const colours = {
	normal: '#A8A77A',
	lite_normal: '#CCCB95',
	dark_normal: '#333325',

	fire: '#DE792C',
	lite_fire: '#FFD1A6',
	dark_fire: '#7B3B09',

	water: '#6390F0',
	lite_water: '#A7C7FF',
	dark_water: '#27408B',

	electric: '#F7D02C',
	lite_electric: '#FFF7B2',
	dark_electric: '#8A7B1A',

	grass: '#7AC74C',
	lite_grass: '#C6F6B6',
	dark_grass: '#355C1A',

	ice: '#96D9D6',
	lite_ice: '#D6F6F6',
	dark_ice: '#3A6C6A',

	fighting: '#C22E28',
	lite_fighting: '#F5A6A3',
	dark_fighting: '#6B1815',

	poison: '#A33EA1',
	lite_poison: '#E0B3DF',
	dark_poison: '#4B184A',

	ground: '#E2BF65',
	lite_ground: '#F6E7B6',
	dark_ground: '#7B6A2C',

	flying: '#A98FF3',
	lite_flying: '#D6CFFF',
	dark_flying: '#4B3A7B',

	psychic: '#F95587',
	lite_psychic: '#FFB3CF',
	dark_psychic: '#7B294A',

	bug: '#A6B91A',
	lite_bug: '#E0F6A6',
	dark_bug: '#4B5C1A',

	rock: '#B6A136',
	lite_rock: '#F6E7B6',
	dark_rock: '#6B5C1A',

	ghost: '#735797',
	lite_ghost: '#D1C6E0',
	dark_ghost: '#2C1A3A',

	dragon: '#6F35FC',
	lite_dragon: '#C6B3FF',
	dark_dragon: '#2C1A7B',

	dark: '#705746',
	lite_dark: '#C6B3A6',
	dark_dark: '#2C1A14',

	steel: '#B7B7CE',
	lite_steel: '#E0E0F6',
	dark_steel: '#4B4B5C',

	fairy: '#D685AD',
	lite_fairy: '#FFD6EB',
	dark_fairy: '#7B294A',
}
type ColourVariants = 'lite' | 'dark' ;
export function getColor(type: PokemonType, variant?: ColourVariants): string {
  const key = (variant ? `${variant}_${type}` : type) as keyof typeof colours;
  return String(colours[key] || colours[type] || '#e5e7eb');
}

export type PokemonType = Exclude<keyof typeof colours, `lite_${string}` | `dark_${string}`>;
