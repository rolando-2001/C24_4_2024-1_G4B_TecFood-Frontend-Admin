import { Grid, TextField, Button } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useAuthStore } from "../../services/useAuthStore";
import { useEffect } from "react";

import Swal from 'sweetalert2'
// eslint-disable-next-line no-unused-vars
const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

export const LoginPage = () => {
 const {startLogin,errorMessage } =useAuthStore();



  const { loginEmail, loginPassword, onInputChange } = useForm(loginFormFields);

  const loginSubmit = (even) => {
    even.preventDefault();

    {/* */}
    startLogin({email:loginEmail,password:loginPassword})
    
  };
   

  useEffect(() => {
    if(errorMessage!==undefined){
      Swal.fire('errror en la Autenticacion',errorMessage,'error')
    }
      

  },[errorMessage])
  
  return (
    <AuthLayout title="Login">
      <form onSubmit={loginSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              placeholder="correo@google.com"
              fullWidth
              name="loginEmail"
              value={loginEmail}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              placeholder="contraseña"
              type="password"
              fullWidth
              name="loginPassword"
              value={loginPassword}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button variant="contained" fullWidth type="submit">
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
