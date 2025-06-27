"use client";

import Image from "next/image";
import { Pokemon } from "../models/Pokemon";

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
        src={pokemon.sprite}
        alt={pokemon.name}
        width={96}
        height={96}
        className="mx-auto"
      />
      <p className="text-center capitalize mt-2 font-semibold">{pokemon.name}</p>
    </div>
  );
}
