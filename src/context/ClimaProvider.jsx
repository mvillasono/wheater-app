import { useState, createContext } from "react";
import {
  getCoordenadas,
  getClimaPorCoordenadas,
} from "../services/climaService";
const ClimaContext = createContext();
const ClimaProvider = ({ children }) => {
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  const datosBusqueda = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  const [resultado, setResultado] = useState({});

  // Permitir limpiar el resultado desde el formulario
  if (typeof window !== "undefined") {
    window.removeEventListener("limpiar-clima", () => setResultado({}));
    window.addEventListener("limpiar-clima", () => setResultado({}));
  }

  const consultarClima = async (datos) => {
    try {
      const { ciudad, pais } = datos;
      const coords = await getCoordenadas(ciudad, pais);
      if (!coords) {
        setResultado(null);
        return;
      }
      const clima = await getClimaPorCoordenadas(coords.lat, coords.lon);
      setResultado(clima);
    } catch (error) {
      setResultado(null);
      console.log(error);
    }
  };
  return (
    <ClimaContext.Provider
      value={{ busqueda, datosBusqueda, consultarClima, resultado }}
    >
      {children}
    </ClimaContext.Provider>
  );
};
export { ClimaProvider };
export default ClimaContext;
