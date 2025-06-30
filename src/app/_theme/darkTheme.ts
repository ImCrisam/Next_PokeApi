import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#6363db" },
    text: {
      primary: '#EFF7FE',    // Color por defecto del texto principal
      secondary: '#777777',  // Color de texto secundario
    },
    background: {
      default: "#181825",
      paper: "rgba(30,41,59,0.35)",
      
    },
  },
});

export default darkTheme;
