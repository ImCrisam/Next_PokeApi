import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#6363db" },
    text: {
      primary: '#000000',    // Color por defecto del texto principal
      secondary: '#777777',  // Color de texto secundario
    },
    background: {
      default: "#f5f5f5",
      paper: "rgba(255,255,255,0.8)",
    },
  },
});

export default lightTheme;
