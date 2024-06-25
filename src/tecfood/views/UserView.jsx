import { DeleteOutlined, EditOutlined, SaveOutlined } from "@mui/icons-material"
import { Button, Grid, Typography } from "@mui/material"
import { useUserStore } from "../../hooks/useUserStore"
import { useEffect } from "react"


export const UserView = () => {

  const { users,startLoadingUsersEvents}=useUserStore()
  console.log(users)

  useEffect(() => {
    startLoadingUsersEvents()
  },[])


  return (
    <Grid
    container
    direction="row"
    justifyContent="space-between"
    sx={{ mb: 2 }}
  >
    <Grid item>
      <Typography fontSize={39} fontWeight="linght">
        USUARIOS
      </Typography>
    </Grid>

    <Grid item>
      <Button >
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
                {users.map(user => (
                  <tr key={user.user_id}>
                    <td className="align-middle">
                      {user.user_id}
                    </td>
                    <td className="align-middle">{user.first_name.toUpperCase()}</td>
                    <td className="align-middle">{user.last_name}</td>
                    <td className="align-middle">{user.email}</td>
                    <td className="align-middle">{user.role_name ==='ROLE_ADMIN' ? ' ADMIN' : 'USER'}</td>


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
  )
}
