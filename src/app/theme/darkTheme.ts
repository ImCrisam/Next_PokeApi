import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#6363db" },
    background: {
      default: "#181825",
      paper: "rgba(30,41,59,0.35)",
    },
  },
});

export default darkTheme;
