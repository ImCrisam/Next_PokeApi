import React from "react";
import ChipType from "./ChipType";
import { Pokemon } from "../../_types/Pokemon";
import { useThemeMode } from "../../_context/ThemeContext";

const ChipTypesPokemon = (p: Pokemon) => {
  const { mode, toggleMode } = useThemeMode();

  return (
    <>
      {p.types.map((t) => {
        
        return (
          <ChipType key={t.type.name} name={t.type.name} color={mode=="dark"?t.type.darkColor:t.type.lightColor} />
        );
      })}
    </>
  );
};

export default ChipTypesPokemon;
