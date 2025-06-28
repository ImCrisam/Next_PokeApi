import { ReactNode } from "react";
import { TableCell, Box, Typography } from "@mui/material";

interface TableHeaderWithFilterProps {
  label: string;
  children?: ReactNode;
}

export default function TableHeaderWithFilter({ label, children }: TableHeaderWithFilterProps) {
  return (
    <TableCell size="small" align="center" padding="none" >
      <Box 
        sx={{
          p: 0,
          m: 0,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
          width: "100%",
          px: 1,
          py: 0.5,
        }}
      >
        <Typography variant="subtitle2" display={"flex"}  align={"center"} top={0}>{label}</Typography>
        <Box mt={0.5}>{children}</Box>
      </Box>
    </TableCell>
  );
}