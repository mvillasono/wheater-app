// src/services/climaService.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.openweathermap.org";

export async function getCoordenadas(ciudad, pais = "PE") {
  const url = `${BASE_URL}/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${API_KEY}`;
  const { data } = await axios(url);
  if (!data || data.length === 0) return null;
  return data[0];
}

export async function getClimaPorCoordenadas(lat, lon) {
  const url = `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const { data } = await axios(url);
  return data;
}
