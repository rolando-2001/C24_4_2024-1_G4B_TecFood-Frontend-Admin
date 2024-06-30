import { useEffect, useState } from "react";
import { useUiStore } from "../../hooks";
import Modal from "react-modal";


import { showToast } from "../../helpers/showToast";
import { SaveOutlined } from "@mui/icons-material";
import { useCategoryStore } from "../../hooks/useCategoryStore";

const customStyles = {
  content: {
    top: "55%",
    left: "60%",
    right: "auto",
    bottom: "auto",
    maxHeight: "300px",
    maxWidth: "500px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CategoryModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
 
  const {startCategoryEvent,activeCategoryEvent}=useCategoryStore();
  const onCloseModal = () => {
    closeDateModal();
  };

  const [FormValues, setFormValues] = useState({
    name: "",
  });

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...FormValues,
      [target.name]: target.value,
    });
  };

  const onSubmit = async(event) => {
    event.preventDefault();
    if (FormValues.name.trim() === "") {
        showToast("El nombre es requerido", "error");
      return;
    }
     await startCategoryEvent(FormValues);

    closeDateModal();
  };

  useEffect(()=>{
    if(activeCategoryEvent!==null){
      setFormValues({...activeCategoryEvent});
    }
  },[activeCategoryEvent])


  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo Categoria </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="name">Nombre</label>
          <input
            name="name"
            id="name"
            value={FormValues.name}
            onChange={handleInputChange}
            className="form-control mt-2"
            placeholder="Nombre de la Categoria"
          />
        </div>
        <hr />
        <button type="submit" className="btn btn-outline-primary btn-block">
          <SaveOutlined/>
           Guardar
        </button>
      </form>
    </Modal>
  );
};
