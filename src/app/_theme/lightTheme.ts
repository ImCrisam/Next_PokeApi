import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#6363db" },
    background: {
      default: "#f5f5f5",
      paper: "rgba(255,255,255,0.8)",
    },
  },
});

export default lightTheme;
