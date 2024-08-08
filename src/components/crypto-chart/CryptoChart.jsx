import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Stack,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import TestAreaChart from "./TestAreaChart.jsx";
import axios from "axios";
import PriceDisplay from "./PriceDisplay.jsx";
import ChangeDisplay from "./ChangeDisplay.jsx";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import CustomTabPanel from "./CustomTabPanel.jsx";
import { useTheme } from "@emotion/react";

const toggleOptions = [
  "summary",
  "chart",
  "Statistics",
  "Analysis",
  "Settings",
];

const CryptoChart = () => {
  const [value, setValue] = useState(toggleOptions[1]);
  const [alignment, setAlignment] = useState("1d");
  const [data, setData] = useState([]);
  const theme = useTheme();

  const options = {
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-UFtKRpwTUxZHLJNxNPU3XyLT",
    },
    params: { vs_currency: "usd", days: "1", precision: "4" },
  };

  const fetchCoinGecko = async () => {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart",
      options
    );
    console.log(response.data);
    const prices = response.data.prices.map(([timestamp, price]) => ({
      date: new Date(timestamp).toLocaleString(),
      price,
    }));
    setData(prices);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <>
      <Typography
        variant="h3"
        textAlign={"center"}
      >
        Catalog Assesment
      </Typography>

      <Card sx={{ p: 1 }}>
        <Stack>
          <PriceDisplay>63,179.71</PriceDisplay>
          <ChangeDisplay
            changeAmount={"+123"}
            changePercent={"+3.4%"}
          />
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              sx={{
                fontSize: "2rem",
                "& .MuiTab-root": {
                  textAlign: "left",
                  justifyContent: "flex-start",
                  px: 0,
                  // border: 2,
                },
                minHeight: 0,
                "& .MuiButtonBase-root": {
                  minHeight: 0,
                  minWidth: 0,
                  mr: 1,
                  pr: 1,
                  fontSize: "1.4rem",
                  textTransform: "capitalize",
                  // [theme.breakpoints.down("md")]: {
                  //   fontSize: "1rem",
                  // },
                },
              }}
            >
              {toggleOptions.map((option) => (
                <Tab
                  key={option}
                  value={option}
                  label={option}
                  disableRipple
                />
              ))}
            </Tabs>
          </Box>
          <CustomTabPanel
            value={value}
            index="chart"
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  my: 2,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    "& .MuiButtonBase-root": {
                      fontSize: "1.4rem",
                      textTransform: "capitalize",
                      mb: 1,
                      color: "#6F7177",
                    },
                  }}
                >
                  <Button startIcon={<OpenInFullIcon />}>fullscreen</Button>
                  <Button startIcon={<ControlPointIcon />}>Compare</Button>
                </Box>
                <Box />
                <ToggleButtonGroup
                  value={alignment}
                  exclusive
                  onChange={handleAlignment}
                  sx={{
                    mr: "80px",
                    "& .MuiButtonBase-root": {
                      border: "none",
                      borderRadius: "0.25rem",
                      color: "#6F7177",
                      textTransform: "lowercase",
                      fontSize: "1.4rem",
                      height: "3.5rem",
                      width: "4rem",
                    },
                    "& .MuiButtonBase-root.Mui-selected": {
                      bgcolor: "#4B40EE",
                      color: "#FFFFFF",
                      "&:hover": {
                        bgcolor: "#4B40EE",
                      },
                    },
                  }}
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
              <TestAreaChart />
            </Box>
          </CustomTabPanel>
        </Stack>
      </Card>
    </>
  );
};

export default CryptoChart;
