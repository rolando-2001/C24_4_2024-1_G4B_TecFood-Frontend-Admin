import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import { useCategoryStore } from "../../hooks/useCategoryStore";

export const CategoryView = () => {
  const { categorys } = useCategoryStore();

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 2 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="linght">
        CATEGORIAS
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
            <table className="table table-hover shadow-lg mt-4">
              <thead className="table-info text-center">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {categorys.map((category) => (
                  <tr key={category.dish_category_id}>
                    <td className="align-middle">
                      {category.dish_category_id}
                    </td>
                    <td className="align-middle">{category.name}</td>

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
