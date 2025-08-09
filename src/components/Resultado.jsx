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

const Resultado = () => {
  const [image, setImage] = useState("");
  const { resultado } = useClima();
  const { name, main } = resultado;
  const kelvin = 273.15;

  useEffect(() => {
    switch (resultado?.weather[0].main) {
      case "Clear":
        setImage("/images/clear.png");
        break;

      case "Rain":
        setImage("/images/rain.png");
        break;

      case "Snow":
        setImage("/images/snow.png");
        break;

      case "Clouds":
        setImage("/images/cloud.png");
        break;

      case "Haze":
        setImage("/images/mist.png");
        break;

      default:
        setImage("/images/404.png");
        break;
    }
  }, [resultado]);

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      spacing={4}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <VStack maxW={"sm"} textAlign={"center"} className="image">
        <Image
          src={image}
          alt={resultado?.weather ? resultado.weather[0].description : "Clima"}
          boxSize="200px"
        />

        <Box display={"block"} justifyContent={"center"} alignItems={"center"}>
          <Text
            className="temperature"
            color={useColorModeValue("black", "white")}
          >
            {parseInt(main.temp - kelvin)}
          </Text>
          <Text as={"span"} className="temperature-span">
            &#x2103;
          </Text>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            mb={1}
          >
            <Text
              className="description"
              color={useColorModeValue("black", "white")}
              mb={0}
            >
              {name}
            </Text>
          </Box>
          <Text
            className="description-2"
            color={useColorModeValue("black", "white")}
          >
            {resultado?.weather[0].description}
          </Text>
        </Box>
        <Box className="weather-details">
          <Box className="humidity">
            <FaWater
              className="icon"
              color={useColorModeValue("black", "white")}
            />
            <Text
              className="weather-details-text"
              color={useColorModeValue("black", "white")}
            >
              {main.humidity}%
            </Text>
            <Text
              as={"span"}
              className="weather-details-span"
              color={useColorModeValue("black", "white")}
            >
              Humedad
            </Text>
          </Box>
          <Box className="wind">
            <FaWind
              className="icon"
              color={useColorModeValue("black", "white")}
            />
            <Text
              className="weather-details-text"
              color={useColorModeValue("black", "white")}
            >
              {resultado?.wind.speed} km
            </Text>
            <Text
              as={"span"}
              className="weather-details-span"
              color={useColorModeValue("black", "white")}
            >
              Velocidad del viento
            </Text>
          </Box>
        </Box>
      </VStack>
    </Stack>
  );
};

export default Resultado;
