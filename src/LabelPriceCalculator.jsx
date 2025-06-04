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
  Tooltip,
  IconButton,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

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
  const restrictedUnits = ["Transparent SAV", "Regular SAV", "PP"];

  const handleCalculate = () => {
    const wIn = (parseFloat(width) || 0) * conv[unit];
    const hIn = (parseFloat(height) || 0) * conv[unit];

    let fp = 0;
    let up = 0;

    if (type === "Transparent SAV") {
      fp = ((wIn * hIn) / 144) * 9.5;
      up = fp * 1.5;
    } else if (type === "Regular SAV") {
      fp = ((wIn * hIn) / 144) * 8;
      up = fp * 1.5;
    } else if (type === "PP") {
      fp = ((wIn * hIn) / 144) * 8;
      up = fp * 2;
    } else if (type === "Flexy") {
      const wFt = ((parseFloat(width) || 0) * conv[unit]) / 12;
      const hFt = ((parseFloat(height) || 0) * conv[unit]) / 12;
      fp = wFt * hFt * 2.7;
      up = wFt * hFt * 4;
    } else if (type === "PP Transparent(White)") {
      fp = ((wIn * hIn) / 144) * 16;
      up = fp * 2;
    } else {
      fp = ((wIn * hIn) / 144) * 1.5;
      up = fp * 1.5;
    }

    const tot = up * qty;

    setFinalProd(fp);
    setUnitPrice(up);
    setTotal(tot);
  };

  const handleCopy = () => {
    const text = `\nSales Price: ₵${unitPrice.toFixed(
      2
    )}\nTotal: ₵${total.toFixed(2)}\nQuantity: ${qty}`;
    navigator.clipboard.writeText(text);
  };

  const getAvailableUnits = () => {
    if (type === "Flexy") {
      return ["feet"];
    }
    if (restrictedUnits.includes(type) || type === "PP Transparent(White)") {
      return ["cm", "inch"];
    }
    return Object.keys(conv);
  };

  const fontStyle = {
    fontFamily: "Arial, sans-serif",
    fontSize: "0.9rem",
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Label Price Calculator
      </Typography>

      <Card css={glassCard(theme)}>
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={3}>
          <TextField
            select
            label="Material"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              if (
                (e.target.value === "Flexy" && unit !== "feet") ||
                ((restrictedUnits.includes(e.target.value) ||
                  e.target.value === "PP Transparent(White)") &&
                  (unit === "feet" || unit === "meter"))
              ) {
                setUnit(e.target.value === "Flexy" ? "feet" : "cm");
              }
            }}
            variant="outlined"
            size="small"
            sx={fontStyle}
          >
            {[
              "Transparent SAV",
              "Regular SAV",
              "PP",
              "Flexy",
              "PP Transparent(White)",
            ].map((t) => (
              <MenuItem key={t} value={t} sx={fontStyle}>
                {t}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            variant="outlined"
            size="small"
            sx={fontStyle}
          >
            {getAvailableUnits().map((u) => (
              <MenuItem key={u} value={u} sx={fontStyle}>
                {u}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Width"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            variant="outlined"
            size="small"
            sx={fontStyle}
          />

          <TextField
            label="Height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            variant="outlined"
            size="small"
            sx={fontStyle}
          />

          <TextField
            label="Quantity"
            type="number"
            value={qty}
            onChange={(e) => setQty(+e.target.value)}
            variant="outlined"
            size="small"
            sx={fontStyle}
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
              <Box sx={{ mt: 3 }}>
                <Card
                  css={glassCard(theme)}
                  sx={{
                    width: "200px",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{ ...fontStyle, fontWeight: 600 }}>
                    Cost Price: ₵{finalProd.toFixed(2)}
                  </Typography>
                </Card>

                <Card
                  css={glassCard(theme)}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{ ...fontStyle, fontWeight: 600, color: "#1976d2" }}
                    >
                      Quantity: {qty}
                    </Typography>
                    <Typography
                      sx={{ ...fontStyle, fontWeight: 600, color: "#1976d2" }}
                    >
                      Unit Price: ₵{unitPrice.toFixed(2)}
                    </Typography>
                    <Typography
                      sx={{ ...fontStyle, fontWeight: 600, color: "#1976d2" }}
                    >
                      Total: ₵{total.toFixed(2)}
                    </Typography>
                  </Box>

                  <Tooltip title="Copy to clipboard">
                    <IconButton onClick={handleCopy}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                </Card>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </Box>
  );
}
