import { Chip } from "@mui/material";

interface ChipTypeProps {
  name: string;
  color: string;
}

export default function ChipType({ name, color }: ChipTypeProps) {
  return (
    <Chip
      label={name}
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
