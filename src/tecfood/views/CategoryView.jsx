import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import { useCategoryStore } from "../../hooks/useCategoryStore";
import { useEffect, useState } from "react";
import { CategoryModal } from "../components";
import { useUiStore } from "../../hooks";

export const CategoryView = () => {
  const {
    categorys,
    startCategoryLoadingEvents,
    setCategoryEvent,
    startDeleteCategoryEvent,
    
  } = useCategoryStore();

  const { openDateModal } = useUiStore();

  useEffect(() => {
    startCategoryLoadingEvents();
  }, []);

  //! new Category
  const ClickNewCategory = () => {
    setCategoryEvent({
      name: "",
    });
    openDateModal();
  };

  //! Edit Category
  const ClickEditCategory = (category) => {
    setCategoryEvent(category);
    openDateModal();
  };

  //!! Delete Category
  const ClickDeleteCategory = (category) => {
    startDeleteCategoryEvent(category);
  };

  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value)
    
    
  };

  const results = !handleChange ? categorys : categorys.filter((dato)=> dato.name.toLowerCase().includes(search.toLocaleLowerCase()))


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
          fontWeight="500"
          sx={{
            color: "primary.main",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            borderRadius: "5px",
            padding: "10px 10px",
            backgroundColor: "secondary.light",
            display: "inline-block",
          }}
        >
          TOTAL DE CATEGORIAS {categorys.length}
        </Typography>
      </Grid>

      <Grid item>
        <Button onClick={ClickNewCategory}>
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
              onChange={handleChange}
            />
          </div>
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
                {results.map((category) => (
                  <tr key={category.dish_category_id}>
                    <td className="align-middle">
                      {category.dish_category_id}
                    </td>
                    <td className="align-middle">{category.name}</td>

                    <td className="align-middle">
                      <Button
                        onClick={() => ClickDeleteCategory(category)}
                        color="error"
                        variant="contained"
                      >
                        <DeleteOutlined sx={{ fontSize: 20, mr: 1 }} />
                        Eliminar
                      </Button>
                      <Button
                        color="secondary"
                        variant="contained"
                        sx={{ ml: 1 }}
                        onClick={() => ClickEditCategory(category)}
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

      <CategoryModal />
    </Grid>
  );
};
