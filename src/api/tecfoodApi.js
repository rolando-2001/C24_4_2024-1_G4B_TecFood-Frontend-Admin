import axios from "axios";

// Obtener las variables de entorno
const VITE_API_URL = "http://127.0.0.1:8000";

// Crear instancia de axios con la URL base
export const tecfoodApi = axios.create({
  baseURL: VITE_API_URL,
});


tecfoodApi.interceptors.request.use(config => {
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
    };
    return config;
  });
  