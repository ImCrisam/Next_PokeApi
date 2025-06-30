import { useState } from "react";
import { Slider, Box, Typography } from "@mui/material";

interface DebouncedSliderProps {
  value?: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}

export default function DebouncedSlider({ value = 0, onChange, min = 0, max = 100, step = 1, label }: DebouncedSliderProps) {
  const [sliderValue, setSliderValue] = useState<number>(value);

  const handleChange = (_: Event, newValue: number | number[]) => {
    const val = Array.isArray(newValue) ? newValue[0] : newValue;
    setSliderValue(val);
    onChange(val);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {label && <Typography gutterBottom>{label}</Typography>}
      <Slider
        value={sliderValue}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
