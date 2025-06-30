import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Popper from "@mui/material/Popper";
import { useTheme } from "@mui/material/styles";
import { Grid } from "@mui/material";
import ChipType from "../grid/ChipType";

interface TypeInfo {
  nameLocal: string;
  color: string;
}

interface TypePopperProps {
  options: Map<string, TypeInfo>;
  value: string[];
  onChange: (selected: string[]) => void;
  open: boolean;
  anchorEl: HTMLElement | null;
  maxSelected?: number;
  onClose: () => void;
}

export default function TypePopper({
  options,
  value,
  onChange,
  open,
  anchorEl,
  maxSelected = 2,
  onClose,
}: TypePopperProps) {
  const theme = useTheme();

  const handleChipClick = (key: string) => {
    console.log(`Chip clicked: ${key}, Current value: ${value}`);
    
    onChange(
      value.includes(key)
        ? value.filter((t) => t !== key)
        : value.length < maxSelected
        ? [...value, key]
        : value
    );
  };

  return (
    <Popper open={open} anchorEl={anchorEl} style={{ zIndex: theme.zIndex.modal }}>
      <ClickAwayListener onClickAway={onClose}>
        <Grid
          container
          spacing={4}
          className={"glass"}
          sx={{
            p: 1,
            borderRadius: 2,
            maxWidth: { xs: "90%", sm: "70%", md: "50%", lg: "30%", xl: "30%" },
            marginInline: "auto",
            justifyContent: "center",
          }}
        >
          {Array.from(options.entries()).map(([key, type]) => (
            <Grid key={key}>
              <ChipType
                name={type.nameLocal}
                color={type.color}
                selectable
                size="medium"
                isActive={value.includes(key)}
                onClick={() => handleChipClick(key)}
              />
            </Grid>
          ))}
        </Grid>
      </ClickAwayListener>
    </Popper>
  );
}
