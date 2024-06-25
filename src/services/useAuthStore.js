import { useDispatch, useSelector } from "react-redux";
import { tecfoodApi } from "../api/tecfoodApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";


export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await tecfoodApi.post("/api/login/", { email, password });

      localStorage.setItem("AUTH_TOKEN", data.token);

      dispatch(
        onLogin({
          name: data.user.username,
          id: data.user.user_id,
          email: data.user.email,
          role: data.user.role_name,
        })
      );

      console.log({ data });
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 3000); // Aumenta el tiempo de espera para que el mensaje sea visible
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("AUTH_TOKEN");

    if (!token) return dispatch(onLogout());

    try {
      const { data } = await tecfoodApi.post("/api/verify/", { token }
      );
      localStorage.setItem("AUTH_TOKEN", data.token);

      dispatch(
        onLogin({
          name: data.user.username,
          id: data.user.user_id,
          email: data.user.email,
          role: data.user.role_name,
        })
      );
      console.log({ data });
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    //*properties
    status,
    user,
    errorMessage,

    //*methods
    startLogin,
    checkAuthToken,
    startLogout,
  };
};
