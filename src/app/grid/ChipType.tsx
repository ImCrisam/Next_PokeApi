import { Chip } from "@mui/material";
import { colours, PokemonType } from "../utils/colorsTypes";

interface ChipTypeProps {
  type: string;
}

export default function ChipType({ type }: ChipTypeProps) {
  const color = colours[type as PokemonType] || "#e5e7eb";
  return (
    <Chip
      label={type}
      size="small"
      sx={{
        textTransform: "capitalize",
        bgcolor: color,
        color: "white",
        fontWeight: 600,
        letterSpacing: 1,
        boxShadow: 1,
      }}
    />
  );
}
