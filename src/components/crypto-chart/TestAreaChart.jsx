import { Chip, styled, useTheme } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Cross,
  Customized,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const rawData = [
  [1722844845637, 52675.1281, 1375],
  [1722845206982, 52938.4493, 678],
  [1722845441623, 52598.1733, 812],
  [1722845767557, 52687.4115, 1342],
  [1722846051793, 53131.3013, 994],
  [1722846421079, 52981.9824, 1234],
  [1722846681818, 52908.0244, 1587],
  [1722846974440, 52975.0335, 912],
  [1722847241120, 52967.1888, 1114],
];

const PriceChip = styled(Chip)(({ theme }) => ({
  backgroundColor: "black",
  color: "white",
  borderRadius: 3,
}));

const formattedData = rawData.map(([timestamp, price, volume]) => ({
  timestamp: new Date(timestamp).toLocaleDateString(),
  price,
  volume,
}));

const TestAreaChart = ({ data = formattedData }) => {
  const theme = useTheme();
  const [tooltipHeight, setTooltipHeight] = useState(0);
  const [chartSize, setChartSize] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef(null);

  useEffect(() => {
    const container = document.querySelector(".recharts-responsive-container");
    if (container) {
      const { height, width } = container.getBoundingClientRect();
      setChartSize({ x: height, y: width });
    }
  }, []);

  useEffect(() => {
    if (tooltipRef.current) {
      setTooltipHeight(tooltipRef.current.offsetHeight);
    }
  }, [tooltipRef]);

  const lastIndex = data.length - 1;
  const enhancedData = data.map((item, index) => ({
    ...item,
    isLast: index === lastIndex,
  }));
  const cursorPosRef = useRef(null);
  const [, setRender] = useState(false); // To trigger re-render

  const handleMouseMove = (e) => {
    if (e && e.isTooltipActive) {
      cursorPosRef.current = { x: e.chartX, y: e.chartY };
      setRender((prev) => !prev); // Force re-render
      //   console.log(e);
    }
  };

  const handleMouseOut = () => {
    cursorPosRef.current = null;
    setRender((prev) => !prev); // Force re-render
  };

  const handleResize = (height, width) => {
    setChartSize({ x: width, y: height });
  };

  const [min, max] = useMemo(() => {
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    for (let price of rawData) {
      if (price[1] < min) {
        min = price[1];
      }
      if (price[1] > max) {
        max = price[1];
      }
    }
    console.log(min, max);
    return [min, max];
  }, [rawData]);

  return (
    <ResponsiveContainer
      width={"100%"}
      height={400}
      onResize={handleResize}
    >
      <ComposedChart
        data={enhancedData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
      >
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

        <YAxis
          orientation="right"
          yAxisId={"right"}
          type="number"
          domain={[min, max]}
          padding={{ top: 20, bottom: 20 }}
          axisLine={false}
          tick={false}
          hide={true}
        />
        <Tooltip
          position={{ x: chartSize.y - 45 }}
          isAnimationActive={false}
          offset={-16}
          content={
            <PriceChip
              ref={tooltipRef}
              label="62387"
            />
          }
          cursor={
            cursorPosRef.current && (
              <Cross
                x={cursorPosRef.current.x}
                y={cursorPosRef.current.y}
                stroke="black"
                strokeWidth={0.5}
                strokeDasharray={"4 4"}
              />
            )
          }
        />
        <CartesianGrid />
        <Area
          type="monotone"
          dataKey="price"
          stroke={theme.palette.primary.main}
          strokeWidth={2}
          fillOpacity={0.5}
          fill="url(#colorPv)"
          dot={false}
          activeDot={false}
          yAxisId={"right"}
        />
        <Customized
          component={(props) => console.log("custom component:", props)}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default TestAreaChart;
