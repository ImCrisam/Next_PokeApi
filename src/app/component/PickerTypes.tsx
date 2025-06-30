'use client';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ChipType from "../grid/ChipType";
import TypePopper from "./TypePopper";
import { useRef, useState, useEffect } from "react";
import { usePokemonContext } from "../context/PokemonContext";

interface TypeInfo {
  nameLocal: string;
  color: string;
}

interface PickerTypesProps {
  maxSelected?: number;
}

export default function PickerTypes({
  maxSelected = 2,
}: PickerTypesProps) {
  const { types, filterTypes } = usePokemonContext();

  const [open, setOpen] = useState(false);
  const anchorEl = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const onChangeTypePopper = (selected: string[]) => {
    filterTypes.set(selected)
  };


  return (
    <Box sx={{ fontSize: 13, display: "flex", flexDirection: "row", gap: 1, alignItems: "center", justifyContent: "center", paddingTop: "10px" }}>
      <Button
        ref={anchorEl}
        disableRipple
        onClick={handleClick}
        sx={{ width: "100%", borderRadius: 2 }}
      >
        <ChipType name={"Tipos"} color={"#A8A77A"} />
      </Button>
      {filterTypes.value.map((typeKey) => {
        const type = types.get(typeKey);
        if (!type) return null;
        return (
          <ChipType key={typeKey} name={type.nameLocal} color={type.color} onClick={() => filterTypes.set(filterTypes.value.filter((t) => t !== typeKey))} />
        );
      })}
      <TypePopper
        options={types}
        value={filterTypes.value}
        onChange={onChangeTypePopper}
        open={open}
        anchorEl={anchorEl.current}
        maxSelected={maxSelected}
        onClose={()=>setOpen(false)}
      />
    </Box>
  );
}
