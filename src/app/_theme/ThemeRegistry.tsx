"use client";
import { ThemeProvider, CssBaseline, Button } from "@mui/material";
import { useState, useMemo, ReactNode } from "react";
import lightTheme from "./lightTheme";
import darkTheme from "./darkTheme";

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = useMemo(() => (mode === "dark" ? darkTheme : lightTheme), [mode]);

  return (
    <ThemeProvider theme={theme} noSsr defaultMode="system">
      {children}
      <Button
        style={{
          position: "fixed",
          zIndex: 9999,
          padding: "0.5rem 1rem",
        }}
        onClick={() => setMode(mode === "light" ? "dark" : "light")}
      >
        Cambiar modo
      </Button>
    </ThemeProvider>
  );
}
