import { Chip } from "@mui/material";

interface ChipTypeProps {
  name: string;
  color: string;
  onClick?: (name: string) => void;
  selectable?: boolean;
  isActive?: boolean;
  fontSize?: string | number;
  size?: "small" | "medium";
}

export default function ChipType({
  name,
  color,
  onClick,
  selectable = false,
  isActive = false,
  fontSize = "0.8rem",
  size = "small",
}: ChipTypeProps) {
  return (
    <Chip
      label={name}
      size={size}
      sx={{
        textTransform: "capitalize",
        color: selectable ? (isActive ? "white" : color) : "white",
        bgcolor: !selectable ? color : isActive ? color : "#ffffff99",
        fontWeight: 600,
        fontSize: fontSize,
        cursor: selectable ? "pointer" : undefined,
        transition: "all 0.2s",
        border: selectable ? `2px solid ${color}` : "none",
        textShadow: `
    -1px -1px 0 #00000060,
     1px -1px 0 #00000060,
    -1px  1px 0 #00000060,
     1px  1px 0 #00000060,
  `,
      }}
      onClick={onClick ? () => onClick(name) : undefined}
      variant={selectable && isActive ? "filled" : "outlined"}
    />
  );
}
