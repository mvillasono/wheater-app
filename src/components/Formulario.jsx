import {
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useClima from "../hooks/useClima";
import { SearchIcon } from "@chakra-ui/icons";
import { BiMap } from "react-icons/bi";

const Formulario = () => {
  const { busqueda, datosBusqueda, consultarClima } = useClima();
  const { ciudad, pais } = busqueda;
  const [alerta, setAlerta] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(busqueda).includes("")) {
      setAlerta("Todos los campos son obligatorios");
    }
    consultarClima(busqueda);
  };
  return (
    <Stack
      spacing={4}
      w={"full"}
      maxW={"md"}
      bg={useColorModeValue("white", "gray.700")}
      rounded={"xl"}
      boxShadow={"lg"}
      p={6}
      my={12}
    >
      <form onSubmit={handleSubmit}>
        <FormControl id="ciudad" isRequired>
          <InputGroup>
            <InputLeftElement
              children={
                <BiMap style={{ color: useColorModeValue("black", "white") }} />
              }
            />
            <Input
              placeholder="Ingesa región del Perú"
              _placeholder={{ color: "gray.500" }}
              type="text"
              name="ciudad"
              id="ciudad"
              onChange={datosBusqueda}
              value={ciudad}
              list="paises"
            />
            <datalist id="paises">
              <option value="Amazonas"></option>
              <option value="Ancash"></option>
              <option value="Apurimac"></option>
              <option value="Arequipa"></option>
              <option value="Ayacucho"></option>
              <option value="Cajamarca"></option>
              <option value="Cusco"></option>
              <option value="Huancavelica"></option>
              <option value="Huanuco"></option>
              <option value="Ica"></option>
              <option value="Junin"></option>
              <option value="La Libertad"></option>
              <option value="Lambayeque"></option>
              <option value="Lima"></option>
              <option value="Loreto"></option>
              <option value="Madre de Dios"></option>
              <option value="Moquegua"></option>
              <option value="Pasco"></option>
              <option value="Piura"></option>
              <option value="Puno"></option>
              <option value="San Martin"></option>
              <option value="Tacna"></option>
              <option value="Tumbes"></option>
              <option value="Ucayali"></option>
            </datalist>
            <InputRightElement
              children={
                <IconButton
                  colorScheme="blue"
                  aria-label="Call Sage"
                  size="xs"
                  icon={<SearchIcon />}
                  type="submit"
                />
              }
            />
          </InputGroup>
        </FormControl>
      </form>
    </Stack>
  );
};

export default Formulario;
