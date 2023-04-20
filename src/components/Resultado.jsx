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
        setImage("/public/images/clear.png");
        break;

      case "Rain":
        setImage("/public/images/rain.png");
        break;

      case "Snow":
        setImage("/public/images/snow.png");
        break;

      case "Clouds":
        setImage("/public/images/cloud.png");
        break;

      case "Haze":
        setImage("/public/images/mist.png");
        break;

      default:
        setImage("/public/images/404.png");
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
        <Image src={image} alt="wheater" boxSize="200px" />

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
          <Text
            className="description"
            color={useColorModeValue("black", "white")}
          >
            {name}
          </Text>
          <Text
            className="description-2"
            color={useColorModeValue("black", "white")}
          >
            {resultado?.weather[0].description}
          </Text>
        </Box>
        <Box className="weather-details">
          <Box className="humidity">
            <FaWind
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
            <FaWater
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
