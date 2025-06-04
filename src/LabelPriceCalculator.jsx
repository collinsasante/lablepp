/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { css, useTheme } from "@emotion/react";
import {
  Box,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  margin: 50px auto;
`;

function LabelPriceCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [material, setMaterial] = useState("");
  const [price, setPrice] = useState(null);
  const muiTheme = useTheme();

  const handleCalculate = () => {
    if (!length || !width || !material) {
      alert("Please fill out all fields.");
      return;
    }

    const area = parseFloat(length) * parseFloat(width);
    let rate = 0;

    switch (material) {
      case "paper":
        rate = 0.05;
        break;
      case "vinyl":
        rate = 0.1;
        break;
      case "polyester":
        rate = 0.15;
        break;
      default:
        rate = 0;
    }

    setPrice((area * rate).toFixed(2));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box css={containerStyle}>
        <Typography variant="h4">Label Price Calculator</Typography>
        <TextField
          label="Length (in inches)"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          type="number"
          fullWidth
        />
        <TextField
          label="Width (in inches)"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          type="number"
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Material</InputLabel>
          <Select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          >
            <MenuItem value="paper">Paper</MenuItem>
            <MenuItem value="vinyl">Vinyl</MenuItem>
            <MenuItem value="polyester">Polyester</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleCalculate}>
          Calculate
        </Button>
        {price && (
          <Typography variant="h6">Estimated Price: ${price}</Typography>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default LabelPriceCalculator;
