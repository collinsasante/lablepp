/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css, useTheme } from "@emotion/react";
import {
  Box,
  MenuItem,
  TextField,
  Button,
  Card,
  Typography,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const glassCard = (theme) => css`
  backdrop-filter: blur(20px);
  background: ${theme.palette.background.paper};
  border-radius: ${theme.shape.borderRadius}px;
  box-shadow: ${theme.shadows[1]};
  padding: 24px;
`;

const neumorphicButton = (theme) => css`
  box-shadow: ${theme.shadows[2]}, ${theme.shadows[1]};
  border-radius: ${theme.shape.borderRadius}px;
  padding: 12px 24px;
  text-transform: none;
`;

export default function LabelPriceCalculator() {
  const theme = useTheme();
  const [type, setType] = useState("Transparent SAV");
  const [unit, setUnit] = useState("cm");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [qty, setQty] = useState(1);

  const [finalProd, setFinalProd] = useState(null);
  const [unitPrice, setUnitPrice] = useState(null);
  const [total, setTotal] = useState(null);

  const conv = { cm: 0.3937, inch: 1, feet: 12, meter: 39.37 };

  const handleCalculate = () => {
    const wIn = (parseFloat(width) || 0) * conv[unit];
    const hIn = (parseFloat(height) || 0) * conv[unit];
    const fp = ((wIn * hIn) / 144) * 1.5;
    const up = fp * 1.5;
    const tot = up * qty;

    setFinalProd(fp);
    setUnitPrice(up);
    setTotal(tot);
  };

  return (
    <Card css={glassCard(theme)}>
      <Typography variant="h5" gutterBottom>
        Label Price Calculator
      </Typography>
      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={3}>
        <TextField
          select
          label="Material"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {["Transparent SAV", "Regular SAV", "PP", "Flexy", "PP White"].map(
            (t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            )
          )}
        </TextField>

        <TextField
          select
          label="Unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          {Object.keys(conv).map((u) => (
            <MenuItem key={u} value={u}>
              {u}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Width"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
        <TextField
          label="Height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <TextField
          label="Quantity"
          type="number"
          value={qty}
          onChange={(e) => setQty(+e.target.value)}
        />
      </Box>

      <Button css={neumorphicButton(theme)} onClick={handleCalculate}>
        Calculate
      </Button>

      <AnimatePresence>
        {total !== null && (
          <motion.div
            key={total}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Box mt={4}>
              <Typography>Final Prod: {finalProd.toFixed(2)}</Typography>
              <Typography>Unit Price: ₵{unitPrice.toFixed(2)}</Typography>
              <Typography>Total: ₵{total.toFixed(2)}</Typography>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
