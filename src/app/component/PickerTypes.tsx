'use client';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Popper from "@mui/material/Popper";
import { useTheme } from "@mui/material/styles";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import ChipType from "../grid/ChipType";
import { Grid } from "@mui/material";

interface TypeInfo {
  nameLocal: string;
  color: string;
}

interface PickerTypesProps {
  options: Map<string, TypeInfo>;
  value: string[];
  onChange: (selected: string[]) => void;
  maxSelected?: number;
}

export default function PickerTypes({
  options,
  value,
  onChange,
  maxSelected = 2,
}: PickerTypesProps) {
  const [open, setOpen] = useState(false);
  const [pendingValue, setPendingValue] = useState<string[]>(value);
  const anchorEl = useRef<HTMLButtonElement | null>(null);
  const theme = useTheme();

  useEffect(() => {
    setPendingValue(value);
  }, [value]);

  const handleClick = () => {
    setPendingValue(value);
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    onChange(pendingValue);
    setOpen(false);
  };

  const handleChipClick = (key: string) => {
    setPendingValue((prev) => {
      let newValue;
      if (prev.includes(key)) {
        newValue = prev.filter((t) => t !== key);
      } else {
        if (prev.length >= maxSelected) return prev;
        newValue = [...prev, key];
      }
      if (JSON.stringify(newValue) !== JSON.stringify(prev)) {
        setTimeout(() => onChange(newValue), 0);
      }
      return newValue;
    });
  };

  return (
    <Box sx={{ fontSize: 13, display: "flex", flexDirection: "row", gap: 1, alignItems: "center", justifyContent: "center",paddingTop: "10px" }}>
      <Button
        ref={anchorEl}
        disableRipple
        onClick={handleClick}
        sx={{
          width: "100%",
          borderRadius: 2,
          
        }}
      >
        <ChipType name={"Tipos"} color={"#A8A77A"} />
      </Button>
      {value.map((typeKey) => {
        const type = options.get(typeKey);
        if (!type) return null;
        return (
          <ChipType key={typeKey} name={type.nameLocal} color={type.color}  onClick={() => handleChipClick(typeKey)}/>
        );
      })}
      <Popper
        open={open}
        anchorEl={anchorEl.current}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Grid
            container
            spacing={4}
            className={"glass"}
            sx={{
              p: 1,
              borderRadius: 2,
              maxWidth: {xs: "90%", sm: "70%", md: "50%", lg: "30%", xl: "30%"},
              marginInline: "auto",
              justifyContent: "center"
            }}
          >
            {Array.from(options.entries()).map(([key, type]) => (
              <Grid key={key}>
                <ChipType
                  name={type.nameLocal}
                  color={type.color}
                  selectable
                  size="medium"
                  isActive={pendingValue.includes(key)}
                  onClick={() => handleChipClick(key)}
                />
              </Grid>
            ))}
          </Grid>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
}
