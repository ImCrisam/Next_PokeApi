"use client";
import { Masonry } from '@mui/lab';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface MasonryGridProps {
  children: ReactNode[];
  columns?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  spacing?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
}

export default function MasonryGrid({ children, columns = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }, spacing = { xs: 1, sm: 3, md: 5, lg: 5, xl: 8 } }: MasonryGridProps) {
  return (
    <Box sx={{ width: {
      xs: "100%", 
      md: "85%", 
      lg: "70%", 
    },  minHeight: 400, display: 'flex', justifyContent: 'center' }}>
      <Masonry columns={columns} spacing={spacing}>
        {children}
      </Masonry>
    </Box>
  );
}
