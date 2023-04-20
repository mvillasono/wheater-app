import { useState } from "react";
import {
  Flex,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Formulario from "./components/Formulario";
import ToggleColorMode from "./components/ToggleColorMode";
import "./App.css";
import Resultado from "./components/Resultado";
import useClima from "./hooks/useClima";
import NotFound from "./components/NotFound";

function App() {
  const { resultado } = useClima();

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <ToggleColorMode />
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            align={"center"}
            justify={"center"}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "blue.400",
                zIndex: -1,
              }}
            >
              🥵 Wheater
            </Text>
            <br />{" "}
            <Text color={"blue.400"} as={"span"}>
              App Perú 🥶
            </Text>{" "}
          </Heading>

          <Formulario />
          {resultado == null && <NotFound />}
          {resultado?.name && <Resultado />}
        </Stack>
      </Flex>
    </Stack>
  );
}

export default App;
