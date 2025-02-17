import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import { NewModal } from "../components";
import { useUiStore, useDishStore } from "../../hooks";
import { useEffect, useState } from "react";
import { useCategoryStore } from "../../hooks/useCategoryStore";



export const NoteView = () => {
  const {
    dishs = [],
    setDishEvent,
    deleteDishEvent,
    startLoadingEvents,
  } = useDishStore();
  const { startCategoryLoadingEvents } = useCategoryStore();
  const { openDateModal } = useUiStore();

  useEffect(() => {
    startLoadingEvents();
  }, []);

  useEffect(() => {
    startCategoryLoadingEvents();
  }, []);

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

  //!!editar platillo
  const seletDishe = (dish) => {
    setDishEvent(dish);

    openDateModal();
  };

  //!!eliminar platillo
  const handleClickDelete = async (dish) => {
    await deleteDishEvent(dish);
  };

  const [search, setSearch] = useState("");

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  const results = !search? dishs : dishs.filter((dish) =>dish.name.toLowerCase().includes(search.toLowerCase()));

 
  
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
          TOTAL DE PLATILLOS {dishs.length}
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
          <div className="form-group mb-2">
            <label></label>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar Categoria"
              name="search"
              onChange={searcher}
            />
          </div>
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
                {results.map((dish) => (
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

                    <td className="align-middle">S/ {dish.price}</td>
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
