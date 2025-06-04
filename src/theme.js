// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#4F46E5" },
    background: {
      default: "#F3F4F6",
      paper: "rgba(255,255,255,0.2)", // used in glassCard only
    },
  },
  shape: { borderRadius: 16 },
  shadows: [
    "none",
    "0 4px 30px rgba(0,0,0,0.1)", // glassmorphism
    "inset 4px 4px 8px rgba(255,255,255,0.6)", // neumorphism
  ],
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#fff", // solid white dropdown
        },
      },
    },
  },
});

export default theme;
