import { ReactNode } from "react";
import { TableCell, Box, Typography } from "@mui/material";

interface TableHeaderWithFilterProps {
  label: string;
  children?: ReactNode;
}

export default function TableHeaderWithFilter({ label, children }: TableHeaderWithFilterProps) {
  return (
    <TableCell>
      <Box display="flex" flexDirection="column" alignItems="flex-start" gap={0.5}>
        <Typography variant="subtitle2">{label}</Typography>
        {children && <Box mt={0.5}>{children}</Box>}
      </Box>
    </TableCell>
  );
}