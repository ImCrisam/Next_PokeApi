"use client";

import Image from "next/image";
import { Pokemon } from "../types/Pokemon";

type Props = {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
};

export function PokemonCard({ pokemon, onClick }: Props) {
  return (
    <div
      onClick={() => onClick(pokemon)}
      className="cursor-pointer border rounded p-2 shadow hover:shadow-lg transition"
    >
      <div className="text-gray-500 text-xs">#{pokemon.id}</div>
      <Image
        src={pokemon.sprite_front_default ?? "/placeholder.png"}
        alt={pokemon.name}
        width={96}
        height={96}
        className="mx-auto"
        style={{ objectFit: "contain" }}
      />
      <p className="text-center capitalize mt-2 font-semibold">{pokemon.name}</p>
      <div className="flex justify-center gap-2 mt-1">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className="px-2 py-0.5 rounded text-xs bg-gray-200 capitalize"
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}
