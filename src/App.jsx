import React from "react";
import CryptoChart from "./components/crypto-chart/CryptoChart.jsx";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4B40EE",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <CryptoChart />
      </div>
    </ThemeProvider>
  );
};

export default App;
