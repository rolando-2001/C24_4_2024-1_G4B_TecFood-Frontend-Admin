import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import { useUserStore } from "../../hooks/useUserStore";
import { useEffect, useState } from "react";

export const UserView = () => {
  const { users, startLoadingUsersEvents } = useUserStore();
  console.log(users);

  useEffect(() => {
    startLoadingUsersEvents();
  }, []);

  const [search, setSearch] = useState("");
  
  const searcher = (e) => {
    setSearch(e.target.value);
  }

  const results= !search?users:users.filter(user=>user.first_name.toLowerCase().includes(search.toLowerCase()));


  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 2 }}
    >
      <Grid item>
        <Typography
          fontSize={20}
          fontWeight="linght"
          sx={{
            color: "primary.main",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            borderRadius: "5px",
            padding: "10px 10px",
            backgroundColor: "secondary.light",
            display: "inline-block",
          }}
        >
        TOTAL DE  USUARIOS {users.length}
        </Typography>
      </Grid>

      <Grid item>
        <Button>
          <SaveOutlined
            sx={{
              fontSize: 30,
              mr: 2,
            }}
          />
          NUEVO
        </Button>
      </Grid>

      <Grid container>
        <div className="container">
          <div className="table-responsive">
          <div className="form-group mb-2">
            <label></label>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar Por nombre"
              name="search"
              onChange={searcher}
            />
          </div>
            <table className="table table-hover shadow-lg mt-4">
              <thead className="table-info text-center">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <td scope="col">apellido</td>
                  <td scope="col"> email</td>
                  <td scope="col">rol</td>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {results.map((user) => (
                  <tr key={user.user_id}>
                    <td className="align-middle">{user.user_id}</td>
                    <td className="align-middle">
                      {user.first_name.toUpperCase()}
                    </td>
                    <td className="align-middle">{user.last_name}</td>
                    <td className="align-middle">{user.email}</td>
                    <td className="align-middle">
                      {user.role_name === "ROLE_ADMIN" ? " ADMIN" : "USER"}
                    </td>

                    <td className="align-middle">
                      <Button color="error" variant="contained">
                        <DeleteOutlined sx={{ fontSize: 20, mr: 1 }} />
                        Eliminar
                      </Button>
                      <Button
                        color="secondary"
                        variant="contained"
                        sx={{ ml: 1 }}
                      >
                        <EditOutlined sx={{ fontSize: 20, mr: 1 }} />
                        Editar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
