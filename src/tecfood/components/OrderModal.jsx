import Modal from "react-modal";
import { useOrderStore, useUiStore } from "../../hooks";
import { SaveOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { showToast, validateFormOrder } from "../../helpers/showToast";

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

export const OrderModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { orderActive,startOrderEvent } = useOrderStore();

  const [FormValues, setFormValues] = useState({
    order_date: "",
    total: "",
    invoice_report_url: "",
    status: "PENDING",
    user_id: "",
  });

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...FormValues,
      [target.name]: target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    //!!
    const errors = validateFormOrder(FormValues);
    if (errors.length > 0) {
      errors.forEach((error) => showToast(error, "error"));
    } else {

        startOrderEvent(FormValues);
        closeDateModal();
    }
  };

  useEffect(() => {
    if (orderActive !== null) {
      setFormValues({ ...orderActive });
      
    }
  }, [orderActive]);

  const onCloseModal = () => {
    closeDateModal();
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1>Nuevo pedido</h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha del pedido</label>
          <input
            type="datetime-local"
            className="form-control"
            value={FormValues.order_date}
            onChange={handleInputChange}
            placeholder="Fecha del pedido"
            name="order_date"
          />
        </div>

        <div className="form-group mb-2">
          <label>Total</label>
          <input
            type="number"
            className="form-control"
            placeholder="Total"
            name="total"
            value={FormValues.total}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group mb-2">
          <label>URL del reporte de la factura</label>
          <input
            type="text"
            className="form-control"
            placeholder="URL del reporte de la factura"
            value={FormValues.invoice_report_url? FormValues.invoice_report_url : ''}
            onChange={handleInputChange}
            name="invoice_report_url"
          />
        </div>

        <div className="form-group mb-2">
          <label>Estado</label>
          <select
            value={FormValues.status}
            onChange={handleInputChange}
            className="form-control"
            name="status"
          >
            <option value="PENDING">Pendiente</option>
            <option value="PROCESSED">Procesado</option>
            <option value="COMPLETED">Completado</option>
            <option value="CANCELLED">Cancelado</option>
          </select>
        </div>

        <div className="form-group mb-2">
          <label>Usuario</label>
          <input
            value={FormValues.user_id}
            onChange={handleInputChange}
            type="number"
            className="form-control"
            placeholder="Usuario"
            name="user_id"
          />
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <SaveOutlined />
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
