"use client";

import Image from "next/image";
import { Pokemon } from "../types/Pokemon";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";

type Props = {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
};

export function PokemonCard({ pokemon, onClick }: Props) {
  return (
    <Card
      onClick={() => onClick(pokemon)}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        borderRadius: 2,
        boxShadow: 2,
        background: "rgba(255,255,255,0.7)",
        minWidth: 180,
        maxWidth: 240,
        m: "auto",
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: 6 },
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
        <Image
          src={pokemon.sprite_front_default ?? "/placeholder.png"}
          alt={pokemon.name}
          width={96}
          height={96}
          style={{ objectFit: "contain" }}
        />
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
            <Chip
              key={t.type.name}
              label={t.type.name}
              size="small"
              sx={{
                textTransform: "capitalize",
                bgcolor: "#e5e7eb",
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
