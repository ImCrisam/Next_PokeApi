"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ChipType from "../_common/component/ChipType";
import TypePopper from "../_common/component/layers/TypePopper";
import { useRef, useState } from "react";
import { usePokemonContext } from "../_context/PokemonContext";

export default function PickerTypesButton({
  maxSelected = 2,
}: {
  maxSelected?: number;
}) {
  const { types, filterTypes } = usePokemonContext();
  const [open, setOpen] = useState(false);
  const anchorEl = useRef<HTMLButtonElement | null>(null);

  // Obtiene los colores de los tipos seleccionados (máx 2)
  const selectedColors = filterTypes.value
    .map((typeKey) => types.get(typeKey)?.color)
    .filter(Boolean)
    .slice(0, 2) as string[];

  // Gradiente si hay seleccionados, si no color default
  const buttonBg =
    selectedColors.length === 0
      ? "transparent"
      : selectedColors.length === 1
      ? selectedColors[0]
      : `linear-gradient(to right, ${selectedColors[0]}, ${selectedColors[1]})`;

  const handleClick = () => setOpen((prev) => !prev);
  const onChangeTypePopper = (selected: string[]) => filterTypes.set(selected);

  return (
    <Box>
      <Button
        ref={anchorEl}
        disableRipple
        onClick={handleClick}
        sx={{
          background: buttonBg,
          transition: "all 0.3s",
          py: 0,
          px: 0,
          displey: "flex",
          flexDirection: "row",
          color: "black",
          flex: 1,
          border: 0,
          boxShadow: "0 2px 0 0  rgba(0, 0, 0, 0.1)",
          textShadow: `
            -0.5px -0.5px 0 #00000010,
            0.5px -0.5px 0 #00000010,
            -0.5px  0.5px 0 #00000010,
            0.5px  0.5px 0 #00000010`,
        }}
        size="small"
        variant="outlined"
      >
        Filtro
      </Button>
      <TypePopper
        options={types}
        value={filterTypes.value}
        onChange={onChangeTypePopper}
        open={open}
        anchorEl={anchorEl.current}
        maxSelected={maxSelected}
        onClose={() => setOpen(false)}
      />
    </Box>
  );
}
