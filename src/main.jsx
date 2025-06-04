import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import theme from "./theme";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";

const globalStyles = {
  "*": { margin: 0, padding: 0, boxSizing: "border-box" },
  body: {
    background: theme.palette.background.default,
    fontFamily: '"Roboto", sans-serif',
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <GlobalStyles styles={globalStyles} />
    <App />
  </ThemeProvider>
);
