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
import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { CloseIcon } from "@chakra-ui/icons";
import useClima from "../hooks/useClima";
import { SearchIcon } from "@chakra-ui/icons";
import { BiMap } from "react-icons/bi";

const regionesPeru = [
  "Amazonas",
  "Ancash",
  "Apurimac",
  "Arequipa",
  "Ayacucho",
  "Cajamarca",
  "Cusco",
  "Huancavelica",
  "Huanuco",
  "Ica",
  "Junin",
  "La Libertad",
  "Lambayeque",
  "Lima",
  "Loreto",
  "Madre de Dios",
  "Moquegua",
  "Pasco",
  "Piura",
  "Puno",
  "San Martin",
  "Tacna",
  "Tumbes",
  "Ucayali",
];

const Formulario = () => {
  const { busqueda, datosBusqueda, consultarClima, resultado } = useClima();
  // Limpiar resultado del clima
  const limpiarResultado = () => {
    if (typeof window !== "undefined") {
      // El contexto no expone setResultado, pero podemos forzar el estado global si se implementa en el contexto
      // Aquí se puede emitir un evento personalizado o usar un método del contexto si se expone
      // Por ahora, como workaround, forzamos un refresco del estado global con window.dispatchEvent
      window.dispatchEvent(new Event("limpiar-clima"));
    }
  };
  const { ciudad } = busqueda;
  const [alerta, setAlerta] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRegiones, setFilteredRegiones] = useState(regionesPeru);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // const [lastClima, setLastClima] = useState(null);
  // const [showLastClima, setShowLastClima] = useState(false);
  const inputRef = useRef(null);

  // Recordar última búsqueda exitosa
  // useEffect(() => {
  //   const last = localStorage.getItem("ultima-region");
  //   if (last) {
  //     setLastClima(JSON.parse(last));
  //   }
  // }, []);

  // Animación de desaparición lenta para el mensaje de último clima consultado
  // useEffect(() => {
  //   if (resultado && resultado.name) {
  //     localStorage.setItem("ultima-region", JSON.stringify(resultado));
  //     setLastClima(resultado); // Actualiza el último clima mostrado
  //     setTimeout(() => {
  //       const el = document.getElementById("fade-last-clima");
  //       if (el) el.style.opacity = 0;
  //     }, 800);
  //     setTimeout(() => {
  //       setShowLastClima(false);
  //     }, 2300);
  //   } else if (resultado === null) {
  //     setShowLastClima(false);
  //   }
  // }, [resultado]);

  // Fuzzy search para sugerencias
  useEffect(() => {
    if (ciudad) {
      const filtro = regionesPeru.filter((region) =>
        region.toLowerCase().includes(ciudad.toLowerCase())
      );
      setFilteredRegiones(filtro);
      setShowSuggestions(true);
    } else {
      setFilteredRegiones(regionesPeru);
      setShowSuggestions(false);
    }
  }, [ciudad]);

  const handleSuggestionClick = (region) => {
    datosBusqueda({ target: { name: "ciudad", value: region } });
    setShowSuggestions(false);
    inputRef.current.blur();
  };

  const handleClear = () => {
    datosBusqueda({ target: { name: "ciudad", value: "" } });
    setShowSuggestions(false);
    setAlerta("");
    limpiarResultado();
    inputRef.current.focus();
  };

  const handleFocus = () => {
    if (ciudad) setShowSuggestions(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datos = { ...busqueda, pais: "PE" };
    if (!datos.ciudad) {
      setAlerta("Por favor ingresa una región válida de Perú.");
      return;
    }
    // Validar que la ciudad esté en el arreglo de regiones (insensible a mayúsculas/minúsculas)
    const ciudadInput = datos.ciudad.trim().toLowerCase();
    const regionesLower = regionesPeru.map((r) => r.toLowerCase());
    if (!regionesLower.includes(ciudadInput)) {
      setAlerta("ESTO NO ES UNA REGION DEL PERU");
      return;
    }
    setAlerta("");
    setIsLoading(true);
    try {
      await consultarClima(datos);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setShowSuggestions(false);
    } catch (error) {
      setAlerta("No se pudo obtener el clima. Intenta nuevamente.");
      // ...
    } finally {
      setIsLoading(false);
    }
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
      {alerta && (
        <div
          style={{
            color: "red",
            marginBottom: "8px",
            transition: "opacity 0.4s",
            opacity: alerta ? 1 : 0,
            borderRadius: 6,
            background: "#fff0f0",
            padding: "4px 8px",
            fontWeight: 500,
            boxShadow: "0 2px 8px #0001",
          }}
        >
          {alerta}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        autoComplete="on"
        style={{ position: "relative" }}
      >
        <FormControl id="ciudad" isRequired>
          <label
            htmlFor="ciudad"
            style={{ fontWeight: 600, marginBottom: 4, display: "block" }}
          >
            Región del Perú
          </label>
          <InputGroup>
            <InputLeftElement>
              <BiMap style={{ color: useColorModeValue("black", "white") }} />
            </InputLeftElement>
            <Input
              ref={inputRef}
              placeholder="Ej: Lima, Cusco, Piura..."
              _placeholder={{ color: "gray.500" }}
              type="text"
              name="ciudad"
              id="ciudad"
              onChange={datosBusqueda}
              value={ciudad}
              autoComplete="off"
              aria-label="Región del Perú"
              isInvalid={!!alerta}
              onFocus={handleFocus}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            />
            {ciudad && (
              <InputRightElement width="3.5rem">
                <IconButton
                  aria-label="Limpiar búsqueda"
                  icon={<CloseIcon boxSize={2.5} />}
                  size="xs"
                  onClick={handleClear}
                  variant="ghost"
                  tabIndex={-1}
                />
              </InputRightElement>
            )}
            <InputRightElement right={ciudad ? "2.5rem" : 0}>
              <IconButton
                colorScheme="blue"
                aria-label="Buscar clima"
                size="xs"
                icon={
                  isLoading ? (
                    <span
                      className="loader"
                      style={{
                        width: 16,
                        height: 16,
                        border: "2px solid #3182ce",
                        borderTop: "2px solid transparent",
                        borderRadius: "50%",
                        display: "inline-block",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                  ) : (
                    <SearchIcon />
                  )
                }
                type="submit"
                isDisabled={!ciudad || isLoading}
              />
            </InputRightElement>
          </InputGroup>
          {showSuggestions && filteredRegiones.length > 0 && (
            <ul
              style={{
                position: "absolute",
                zIndex: 10,
                background: useColorModeValue("white", "#2D3748"),
                width: "100%",
                borderRadius: 8,
                boxShadow: "0 2px 8px #0002",
                marginTop: 2,
                maxHeight: 180,
                overflowY: "auto",
                padding: 0,
                listStyle: "none",
                transition: "opacity 0.3s",
              }}
            >
              {filteredRegiones.map((region) => (
                <li
                  key={region}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontWeight: 500,
                    color: useColorModeValue("#222", "#fff"),
                    background:
                      ciudad && ciudad.toLowerCase() === region.toLowerCase()
                        ? "#3182ce22"
                        : "inherit",
                  }}
                  onMouseDown={() => handleSuggestionClick(region)}
                >
                  <img
                    src={`/images/${region
                      .toLowerCase()
                      .replace(/ /g, "")}.webp`}
                    alt={`Bandera de ${region}`}
                    style={{
                      width: 22,
                      height: 16,
                      borderRadius: 2,
                      objectFit: "cover",
                      boxShadow: "0 1px 2px #0002",
                      flexShrink: 0,
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/peru.webp";
                    }}
                  />
                  <span style={{ flex: 1 }}>{region}</span>
                </li>
              ))}
            </ul>
          )}
        </FormControl>
      </form>
      {/* Eliminado: Último clima consultado */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </Stack>
  );
};

export default Formulario;
