import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Tabs,
  Tab,
  ToggleButtonGroup,
  ToggleButton,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

const PriceDisplay = styled(Typography)({
  fontSize: "2.5rem",
  fontWeight: "bold",
});

const ChangeChip = styled(Chip)({
  backgroundColor: "#e8f5e9",
  color: "#4caf50",
  fontWeight: "bold",
});

const data = [
  { name: "Mon", value: 62000 },
  { name: "Tue", value: 64000 },
  { name: "Wed", value: 63500 },
  { name: "Thu", value: 64500 },
  { name: "Fri", value: 63800 },
  { name: "Sat", value: 63200 },
  { name: "Sun", value: 63179 },
];

const CryptoCharts = () => {
  const [tab, setTab] = React.useState(0);
  const [timeFrame, setTimeFrame] = React.useState("1w");

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleTimeFrameChange = (event, newTimeFrame) => {
    if (newTimeFrame !== null) {
      setTimeFrame(newTimeFrame);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, m: 2 }}>
      <CardContent>
        <PriceDisplay variant="h1">63,179.71 USD</PriceDisplay>
        <ChangeChip label="+2,161.42 (3.54%)" />

        <Tabs
          value={tab}
          onChange={handleTabChange}
          sx={{ mt: 2 }}
        >
          <Tab label="Summary" />
          <Tab label="Chart" />
          <Tab label="Statistics" />
          <Tab label="Analysis" />
          <Tab label="Settings" />
        </Tabs>

        <Box sx={{ mt: 2, mb: 2 }}>
          <ToggleButtonGroup
            value={timeFrame}
            exclusive
            onChange={handleTimeFrameChange}
            size="small"
          >
            <ToggleButton value="1d">1d</ToggleButton>
            <ToggleButton value="3d">3d</ToggleButton>
            <ToggleButton value="1w">1w</ToggleButton>
            <ToggleButton value="1m">1m</ToggleButton>
            <ToggleButton value="6m">6m</ToggleButton>
            <ToggleButton value="1y">1y</ToggleButton>
            <ToggleButton value="max">max</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <ResponsiveContainer
          width="100%"
          height={200}
        >
          <LineChart data={data}>
            <XAxis
              dataKey="name"
              hide
            />
            <YAxis
              hide
              domain={["auto", "auto"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3f51b5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CryptoCharts;
