"use client";
import { Masonry } from '@mui/lab';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface MasonryGridProps {
  children: ReactNode[];
  columns?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  spacing?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
}

export default function MasonryGrid({ children, columns = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }, spacing = { xs: 1, sm: 2, md: 3, lg: 3, xl: 4 } }: MasonryGridProps) {
  return (
    <Box sx={{ width: '100%', minHeight: 400, display: 'flex', justifyContent: 'center' }}>
      <Masonry columns={columns} spacing={spacing} style={{ margin: '0 auto' }}>
        {children}
      </Masonry>
    </Box>
  );
}
