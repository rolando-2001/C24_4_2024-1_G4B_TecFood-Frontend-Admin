import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import { NewModal } from "../components";
import { useUiStore, useDishStore } from "../../hooks";
import { useEffect } from "react";
import { useCategoryStore } from "../../hooks/useCategoryStore";

export const NoteView = () => {
  //! hooks
  const { dishs, setDishEvent, deleteDishEvent, startLoadingEvents } =
    useDishStore();

  const { startCategoryLoadingEvents } = useCategoryStore();

  const { openDateModal } = useUiStore();

  //! Nuevo Dish
  const handleClickNew = () => {
    setDishEvent({
      name: "",
      img_url: "",
      stock: 0,
      price: 0,
      dish_category_id: 0,
      description: "",
    });
    openDateModal();
  };

  //! Editar Dish
  const seletDishe = (dish) => {
    setDishEvent(dish);
    openDateModal();
  };

  //!! Delete Dish
  const handleClickDelete = (dishs) => {
    setDishEvent(dishs);

    deleteDishEvent();
  };

  //!!List Dishs
  useEffect(() => {
    startLoadingEvents();
  }, []);

  //!! List categorys
  useEffect(() => {
    startCategoryLoadingEvents();
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 2 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="linght">
           PLATILLOS
        </Typography>
      </Grid>

      <Grid item>
        <Button
          onClick={handleClickNew}
          color="primary"
          sx={{ padding: 1, mb: 2 }}
        >
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
                  <th scope="col" className="text-center">
                    Imagen
                  </th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Categoría</th>
                  <th scope="col">stock</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {dishs.map((dish) => (
                  <tr key={dish.dish_id}>
                    <td className="align-middle">
                      <img
                        src={dish.img_url}
                        alt={dish.name}
                        height="60"
                        width="60"
                        className="img-fluid rounded"
                      />
                    </td>
                    <td className="align-middle">{dish.name}</td>
                    <td className="align-middle">
                      {dish.description.length > 20
                        ? `${dish.description.slice(0, 20)}...`
                        : dish.description}
                    </td>

                    <td className="align-middle">${dish.price}</td>
                    <td className="align-middle">{dish.category}</td>
                    <td className="align-middle">{dish.stock}</td>
                    <td className="align-middle">
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => handleClickDelete(dish)}
                      >
                        <DeleteOutlined sx={{ fontSize: 20, mr: 1 }} />
                        Eliminar
                      </Button>
                      <Button
                        onClick={() => seletDishe(dish)}
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

        <NewModal />
      </Grid>
    </Grid>
  );
};
