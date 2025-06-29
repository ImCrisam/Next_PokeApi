"use client";
import { useState } from "react";
import { Box, Paper, IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function BottomDrawer({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        paddingInline: 1,
        maxHeight: "85vh",
        zIndex: 1300,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        bgcolor: "transparent",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          transition: "max-height 0.3s cubic-bezier(.4,0,.2,1)",
          maxHeight: open ? "85vh" : "40px",
          height: "auto",
          minHeight: "40px",
          position: "relative",
          pointerEvents: "auto",
          overflow: "hidden",
          background: "transparent",
          backdropFilter: "blur(8px)",
        }}
      >
        <Box
          sx={{
            width: "100vw",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
            background: "rgba(64, 52, 85, 0.7)",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            boxShadow: open ? 2 : 0,
          }}
          onClick={() => setOpen((v) => !v)}
        >
          <IconButton>
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </IconButton>
        </Box>
        <Box
          sx={{
            mt: "40px",
            width: "100%",
            maxHeight: open ? "calc(85vh - 40px)" : 0,
            transition: "max-height 0.3s cubic-bezier(.4,0,.2,1)",
            opacity: open ? 1 : 0,
            pointerEvents: open ? "auto" : "none",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            py: 2,
            px: 1,
            bgcolor: "transparent",
          }}
        >
          {children}
        </Box>
      </Paper>
    </Box>
  );
}
