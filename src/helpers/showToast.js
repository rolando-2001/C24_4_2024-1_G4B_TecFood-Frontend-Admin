
import toast from "react-hot-toast";

export const showToast = (message, type) => {
    toast[type](message, {
      position: "top-right",
      duration: 2000,
      style: {
        backgroundColor: "rgb(255, 102, 83)",
        color: "#fff",
        borderRadius: "5px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      },
    });
  };

export const successToast = (message, type) => {
    toast[type](message, {
      position: "top-right",
      duration: 2000,
    });

  }

// validation.js
export const validateForm = (formValues) => {
  const errors = [];

  if (!formValues.name.trim()) {
    errors.push("El nombre es obligatorio");
  }
  if (!formValues.img_url.trim()) {
    errors.push("La URL de la imagen es obligatoria");
  }
  if (formValues.stock < 0) {
    errors.push("El stock no puede ser negativo");
  }
  if (formValues.price <= 0) {
    errors.push("El precio debe ser mayor que cero");
  }
  if (formValues.dish_category_id <= 0) {
    errors.push("La categoría es obligatoria");
  }
  if (!formValues.description.trim()) {
    errors.push("La descripción es obligatoria");
  }

  return errors;
};


export const validateFormOrder = (formValues) => {
  const errors = [];

  if (!formValues.order_date || !formValues.order_date.trim()) {
    errors.push("Fecha del pedido requerida.");
  }
  if (!formValues.total || formValues.total <= 0) {
    errors.push("Total mayor a cero ");
  }
  if (!formValues.status || !formValues.status.trim()) {
    errors.push("Estado requerido.");
  }
  if (!formValues.user_id || formValues.user_id <= 0) {
    errors.push("Usuario requerido.");
  }

  return errors;
};

