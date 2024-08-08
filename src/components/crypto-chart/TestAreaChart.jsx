import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Chip, styled, useTheme } from "@mui/material";
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
import ChartGradient from "./ChartGradient";

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
  fontSize: "1.4rem",
}));
const CurrentPriceChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  borderRadius: 3,
  fontSize: "1.4rem",
}));

const scaleFactor = 20 / 2000;

const formattedData = rawData.map(([timestamp, price, volume]) => ({
  timestamp: new Date(timestamp).toLocaleDateString(),
  price,
  volume: volume * scaleFactor,
}));

const renderCustomLabel = (props) => {
  const { xAxisMap, yAxisMap, data } = props;
  const lastDataPoint = data[data.length - 1];
  const xCoord = props.xAxisMap[0].width;
  // console.log(props);
  const yCoord = yAxisMap.right.scale(lastDataPoint.price);

  // console.log(xCoord, yCoord);
  return (
    <foreignObject
      x={xCoord - 10}
      y={yCoord - 25}
      width={100}
      height={50}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <CurrentPriceChip label={`${lastDataPoint.price.toFixed(2)}`} />
      </div>
    </foreignObject>
  );
};

const CustomBox = (props) => {
  const chartY = props.chartY;
  const chartX = props.chartX;
  const widthX = props.xAxisMap[0].width;
  let price = props.yAxisMap.right.scale.invert(chartY);
  // console.log(price);
  // console.log(props);
  if (props.isTooltipActive) {
    return (
      <foreignObject
        x={widthX - 10}
        y={chartY - 16}
        width={100}
        height="50"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <PriceChip label={price.toFixed(2)} />
        </div>
      </foreignObject>
    );
  }
  return null;
};

const TestAreaChart = ({ data = formattedData }) => {
  const theme = useTheme();
  const [tooltipHeight, setTooltipHeight] = useState(0);
  const [chartSize, setChartSize] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef(null);
  const [showCurrentPrice, setShowCurrentPrice] = useState(false);

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
    <Box sx={{ overflow: "visible", position: "relative" }}>
      <ResponsiveContainer
        width={"100%"}
        height={343}
        onResize={handleResize}
      >
        <ComposedChart
          data={enhancedData}
          margin={0}
          width={"100%"}
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
            padding={{ top: 40, bottom: 40 }}
            axisLine={false}
            tick={false}
            // hide={true}
            width={80}
          />
          {/* <YAxis
            yAxisId="left"
            orientation="left"
            axisLine={false}
            hide={true}
            width={0}
            domain={[0, 200]}
          />
          <Bar
            yAxisId="left"
            dataKey="volume"
            barSize={5}
            fill="#E6E8EB"
          /> */}

          <Tooltip
            position={{ x: chartSize.y - 150 }}
            isAnimationActive={false}
            offset={-16}
            content={(props) => {
              // console.log(props);
            }}
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
          {/* cartesian grid */}
          <CartesianGrid strokeOpacity={0.3} />

          {/* Area plot */}
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
            onAnimationEnd={() => setShowCurrentPrice(true)}
            style={{ overflow: "visible", border: "2px solid red" }}
          />
          {/* Custom current price chip */}
          {showCurrentPrice && <Customized component={renderCustomLabel} />}
          {/* custom tooltip */}
          <Customized component={CustomBox} />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TestAreaChart;
