import { useState, useEffect } from "react";
import { usePokemonContext } from "../context/PokemonContext";
import { Autocomplete, TextField } from "@mui/material";

interface TypeFilterAutocompleteProps {
  onFilterChange: (selectedTypes: string[]) => void;
}

export default function TypeFilterAutocomplete({ onFilterChange }: TypeFilterAutocompleteProps) {
  const { types } = usePokemonContext();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    onFilterChange(selectedTypes);
  }, [selectedTypes, onFilterChange]);

  return (
    <Autocomplete
      multiple
      limitTags={2}
      options={types}
      value={selectedTypes}
      onChange={(_, newValue) => {
        if (newValue.length <= 2) setSelectedTypes(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Filtrar Tipos" placeholder="Tipos" size="small" />
      )}
      size="small"
    />
  );
}