//import { SaveOutlined } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import { useDishStore, useUiStore } from "../../hooks";

import { fileUpload } from "../../helpers/fileUpload";
import { useCategoryStore } from "../../hooks/useCategoryStore";
import { showToast, validateForm } from "../../helpers/showToast";



const customStyles = {
  content: {
    top: "55%",
    left: "60%",
    right: "auto",
    bottom: "auto",
    maxHeight: "620px",
    maxWidth: "500px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
 
  },
};

Modal.setAppElement("#root");

export const NewModal = () => {
  //!

  const [formFormSubmited, setFormSubmited] = useState(false);

  //! useUiStore hooks
  const { isDateModalOpen, closeDateModal } = useUiStore();

  //! useDishSotre hooks
  const { activeEvent, startDishEvent } = useDishStore();

  //! useCategoryStore hooks
  const { categorys } = useCategoryStore();

  //! Formulario
  const [formValues, setFormValues] = useState({
    name: "",
    img_url: "",
    stock: 0,
    price: 0,
    dish_category_id: 0,
    description: " ",
  });

  //!! Validar formulario
  const inputValidate = useMemo(() => {
    if (!formFormSubmited) return "";

    return formValues.name.length > 0 ? "is-valid" : "is-invalid";
  }, [formValues.name, formFormSubmited]);

  //!Valores de Formulario
  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,

      [target.name]: target.value,
    });
  };

  //! Enviar Formulario
  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmited(true);

    //!!
    const errors = validateForm(formValues);
    if (errors.length > 0) {
      errors.forEach((error) => showToast(error, "error"));
    }else{
      await startDishEvent(formValues);

      closeDateModal();
    }


  };

  /** */
  const onCloseModal = () => {
    closeDateModal();
  };

  //! Cargar valores del formulario
  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onFileInputChanged = async ({ target }) => {
    if (target.files.length === 0) return;
    try {
      const imageUrl = await fileUpload(target.files[0]);
      setFormValues({
        ...formValues,
        img_url: imageUrl,
      });
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };


  

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className='modal'
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1>Nuevo Producto</h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group mb-3">
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                className={`form-control ${inputValidate}`}
                placeholder="Nombre del producto"
                type="text"
                name="name"
                value={formValues.name}
                onChange={onInputChanged}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="img_url">Imagen</label>
              <input
                id="img_url"
                className="form-control"
                type="file"
                name="img_url"
                autoComplete="off"
                onChange={onFileInputChanged}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="stock">Stock</label>
              <input
                id="stock"
                type="number"
                className="form-control"
                placeholder="Stock"
                name="stock"
                autoComplete="off"
                value={formValues.stock}
                onChange={onInputChanged}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="price">Precio</label>
              <input
                id="price"
                type="number"
                step="0.01"
                className="form-control"
                placeholder="Precio"
                name="price"
                autoComplete="off"
                value={formValues.price}
                onChange={onInputChanged}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="form-group mb-3">
              <label htmlFor="dish_category_id">Categoría del Plato</label>
              <select
                id="dish_category_id"
                className="form-control"
                name="dish_category_id"
                value={formValues.dish_category_id}
                onChange={onInputChanged}
              >
                {categorys.map((category) => (
                  <option
                    key={category.dish_category_id}
                    value={category.dish_category_id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="form-group mb-3">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                className="form-control"
                placeholder="Descripción del producto"
                rows="3"
                name="description"
                value={formValues.description}
                onChange={onInputChanged}
              ></textarea>
              <small className="form-text text-muted">
                Información adicional
              </small>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
