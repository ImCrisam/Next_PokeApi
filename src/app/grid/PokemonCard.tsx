"use client";

import Image from "next/image";
import { Pokemon } from "../types/Pokemon";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Chip } from "@mui/material";
import ChipType from "./ChipType";
import { colours, PokemonType } from "../utils/colorsTypes";

type Props = {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
};

export function PokemonCard({ pokemon, onClick }: Props) {
  // Obtener los colores de los tipos
  const typeColors = pokemon.types.map((t) => colours[t.type.name as PokemonType] + 80 || "#e5e7eb");
  let background;
  if (typeColors.length === 1) {
    background = typeColors[0];
  } else if (typeColors.length > 1) {
    background = `linear-gradient(135deg, ${typeColors[0]}, ${typeColors[1]})`;
  } else {
    background = "#e5e7eb";
  }
  return (
    <Box
      onClick={() => onClick(pokemon)}
      className="glass"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background,
      }}
    >
      <Box sx={{ position: "absolute", top: 8, left: 8 }}>
        <Chip
          label={`#${pokemon.id}`}
          size="small"
          sx={{ bgcolor: "#f3f4f6", color: "#6b7280" }}
        />
      </Box>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
        }}
      >
        <Box>
          {pokemon.sprite_front_female && (
            <Image
              src={pokemon.sprite_front_female ?? "/placeholder.png"}
              alt={pokemon.name}
              width={96}
              height={96}
              style={{ objectFit: "contain" }}
            />
          )}

          <Image
            src={pokemon.sprite_front_default ?? "/placeholder.png"}
            alt={pokemon.name}
            width={96}
            height={96}
            style={{ objectFit: "contain" }}
          />
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "center",
            textTransform: "capitalize",
            mt: 1,
            fontWeight: 600,
          }}
        >
          {pokemon.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            mt: 1,
          }}
        >
          {pokemon.types.map((t) => (
            <ChipType key={t.type.name} type={t.type.name} />
          ))}
        </Box>
      </CardContent>
    </Box>
  );
}
