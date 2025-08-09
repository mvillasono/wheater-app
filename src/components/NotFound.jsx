import {
  Box,
  Image,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaWater, FaWind } from "react-icons/fa";
import useClima from "../hooks/useClima";

const NotFound = () => {
  const [image, setImage] = useState("/images/404.png");

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      spacing={4}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <VStack maxW={"sm"} textAlign={"center"} className="image">
        <Image src={image} alt="No se encontró la región" boxSize="300px" />

        <Box display={"block"} justifyContent={"center"} alignItems={"center"}>
          <Text
            className="description-2"
            color={useColorModeValue("black", "white")}
          >
            Por favor solo busca <br></br>por regiones del rico Perú
          </Text>
        </Box>
      </VStack>
    </Stack>
  );
};

export default NotFound;
