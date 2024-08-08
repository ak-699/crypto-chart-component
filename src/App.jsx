import React from "react";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import CryptoChart from "./components/crypto-chart/CryptoChart.jsx";

let theme = createTheme({
  palette: {
    primary: {
      main: "#4B40EE",
    },
  },
});

theme = responsiveFontSizes(theme, { factor: 1.2 });

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CryptoChart />
    </ThemeProvider>
  );
};

export default App;
