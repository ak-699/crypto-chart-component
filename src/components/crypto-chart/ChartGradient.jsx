import React from "react";

const ChartGradient = () => {
  return (
    <>
      <defs>
        <linearGradient
          id="colorUv"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="5%"
            stopColor={theme.palette.primary.main}
            stopOpacity={0.1}
          />
          <stop
            offset="95%"
            stopColor={theme.palette.primary.main}
            stopOpacity={0}
          />
        </linearGradient>
        <linearGradient
          id="colorPv"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="5%"
            stopColor={theme.palette.primary.main}
            stopOpacity={0.4}
          />
          <stop
            offset="95%"
            stopColor={theme.palette.primary.main}
            stopOpacity={0}
          />
        </linearGradient>
      </defs>
    </>
  );
};

export default ChartGradient;
