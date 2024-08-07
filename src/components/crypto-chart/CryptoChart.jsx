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

const toggleOptions = [
  "summary",
  "chart",
  "Statistics",
  "Analysis",
  "Settings",
];

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      sx={{
        "& .css-19kzrtu": {
          padding: 0,
        },
      }}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

const CryptoChart = () => {
  const [value, setValue] = useState(toggleOptions[1]);
  const [alignment, setAlignment] = useState("1d");
  const [data, setData] = useState([]);

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
        variant="h1"
        textAlign={"center"}
      >
        Catalog Assesment
      </Typography>

      <Card sx={{ p: 10, m: 5 }}>
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
                my: 2,
                "& .MuiTab-root": {
                  textAlign: "left",
                  justifyContent: "flex-start",
                  px: 0,
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
              <Box sx={{ display: "flex", flexWrap: "wrap", mt: 5, mb: 2 }}>
                <Box sx={{ mr: 10 }}>
                  <Button startIcon={<OpenInFullIcon />}>fullscreen</Button>
                  <Button startIcon={<ControlPointIcon />}>Compare</Button>
                </Box>
                <Box />
                <ToggleButtonGroup
                  value={alignment}
                  exclusive
                  onChange={handleAlignment}
                  sx={{
                    "& .css-ueukts-MuiButtonBase-root-MuiToggleButton-root": {
                      border: "none",
                      borderRadius: "0.25rem",
                      color: "#6F7177",
                      textTransform: "lowercase",
                      width: "2.8rem",
                      height: "2rem",
                      mr: 1,
                    },
                    "& .css-ueukts-MuiButtonBase-root-MuiToggleButton-root.Mui-selected":
                      {
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
