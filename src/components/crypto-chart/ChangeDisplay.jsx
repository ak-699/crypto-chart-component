import { Typography } from "@mui/material";
import React from "react";

const ChangeDisplay = ({ changeAmount, changePercent }) => {
  return (
    <>
      <Typography
        sx={{
          fontSize: "1.2rem",
          fontWeight: 400,
          lineHeight: "1.5rem",
          color: "#67BF6B",
          my: 1,
        }}
      >
        {changeAmount} ({changePercent})
      </Typography>
    </>
  );
};

export default ChangeDisplay;
