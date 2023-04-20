import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import "./index.css";
import { ClimaProvider } from "./context/ClimaProvider";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ClimaProvider>
      <App />
    </ClimaProvider>
  </ChakraProvider>
);
