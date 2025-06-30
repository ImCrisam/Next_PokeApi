"use client";

import Image from "next/image";
import { Pokemon } from "../_types/Pokemon";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Chip } from "@mui/material";
import ChipType from "../_common/component/ChipType";
import { colours, PokemonType } from "../_common/utils/colorsTypes";
import { usePokemonContext } from "../_context/PokemonContext";

type Props = {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
};

export function PokemonCard({ pokemon, onClick }: Props) {
  const { getTypeGlassBackground, types } = usePokemonContext();

  const background = getTypeGlassBackground(pokemon.types, {
    deg: 135,
    opacity: 80,
  });
  return (
    <Box
      onClick={() => onClick(pokemon)}
      className="glass card glass-hover"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: background,
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
        {" "}
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "center",
            textTransform: "capitalize",
            mt: 1,
            fontWeight: 600,
            fontSize: "1.5rem",
            color: "#1f2937",
            fontFamily:
              "Pokemon Hollow, Pokemon Solid, Arial, Helvetica, sans-serif",
          }}
        >
          {pokemon.name}
        </Typography>
        <Box>
          <Image
            src={pokemon.sprite_official_artwork_default ?? "/placeholder.png"}
            alt={pokemon.name}
            width={96}
            height={96}
            style={{ objectFit: "contain" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            mt: 1,
          }}
        >
          {pokemon.types.map((t) => (
            <ChipType
              key={t.type.name}
              name={t.type.name}
              color={t.type.color ?? "#e5e7eb"}
            />
          ))}
        </Box>
      </CardContent>
    </Box>
  );
}
