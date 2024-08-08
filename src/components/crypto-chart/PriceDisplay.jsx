import React from "react";
import { Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const PriceDisplay = ({ children }) => {
  const theme = useTheme();
  return (
    <>
      <Typography
        sx={{
          fontFamily: "Circular Std",
          fontSize: "4.5rem",
          fontWeight: "400",
          // lineHeight: "5.5rem",
          textAlign: "left",
          "&::after": {
            content: "'USD'",
            fontSize: "1.5rem",
            lineHeight: "2",
            verticalAlign: "text-top",
            color: "#BDBEBF",
          },
        }}
      >
        {children}
      </Typography>
    </>
  );
};

export default PriceDisplay;
