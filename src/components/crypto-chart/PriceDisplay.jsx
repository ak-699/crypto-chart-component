import { Typography } from "@mui/material";
import React from "react";

const PriceDisplay = ({ children }) => {
  return (
    <>
      <Typography
        sx={{
          fontFamily: "Circular Std",
          fontSize: "4.5rem",
          fontWeight: "400",
          lineHeight: "5.5rem",
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
