import { useEffect } from "react";
import { useAuthStore } from "../services/useAuthStore";
import { Navigate, Route, Routes } from "react-router-dom";
import { TecfoodPage } from "../tecfood/pages";
import { LoginPage } from "../auth/pages";
import { Box, CircularProgress } from "@mui/material";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore(); // Corregir el nombre de la función

  useEffect(() => {
    checkAuthToken();
  }, []); // Solo llamar una vez cuando el componente se monta

  if (status === "checking") {
    return (
      <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
    );
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<TecfoodPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
