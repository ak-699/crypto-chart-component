import React from "react";
import { Typography } from "@mui/material";

const ChangeDisplay = ({ changeAmount, changePercent }) => {
  return (
    <>
      <Typography
        sx={{
          fontSize: "1.4rem",
          fontWeight: 400,
          lineHeight: "2.27rem",
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
