import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import { useOrderStore, useUiStore } from "../../hooks";
import { useEffect, useState } from "react";
import { OrderModal } from "../components";


export const OrderView = () => {
  const { orders = [], getListOrders,setOrderEvent ,startDeleteOrder} = useOrderStore();

  const { openDateModal } = useUiStore();



  useEffect(() => {
    getListOrders();
  },[]);

  const clickNewOrder = () => {
    setOrderEvent({
      order_date: "",
      total: "",
      invoice_report_url: "",
      status: "PENDING",
      user_id: "",
    })
    openDateModal();
  };

 const clickEditOrder = (order) => {
    setOrderEvent(order);
    openDateModal();
 };

 const clickDeleteOrder = async(order) => {
  await startDeleteOrder(order);
 }

 const[search,setSearch]= useState('');

  const handleChange = (e) => {
    setSearch(e.target.value)
    
  }


  const results = !handleChange ? orders : orders.filter((dato)=> dato.status.toLowerCase().includes(search.toLocaleLowerCase()))

 

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
          Total de Ordenes {orders.length}
        </Typography>
      </Grid>

      <Grid item>
        <Button onClick={clickNewOrder}>
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
              placeholder="Buscar Orden por Usuario"
              name="search"
              onChange={handleChange}
            />
          </div>
            <table className="table table-hover shadow-lg mt-4">
              <thead className="table-info text-center">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Total</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Usuario Id</th>
                  <th scope="col">Fecha de Orden</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {results.map((order) => (
                  <tr key={order.order_id}>
                    <td className="align-middle">{order.order_id}</td>
                    <td className="align-middle">S/{order.total}</td>
                    <td className="align-middle">{order.status}</td>
                    <td className="align-middle">{order.order_user}</td>
                    <td className="align-middle">{order.user_id}</td>
                    <td className="align-middle">{order.order_date}</td>

                    <td className="align-middle">
                      <Button color="error" variant="contained"
                      
                      onClick={() => clickDeleteOrder(order)}
                      >
                        <DeleteOutlined sx={{ fontSize: 20, mr: 1 }} />
                        Eliminar
                      </Button>
                      <Button
                       onClick={() => clickEditOrder(order)}
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
       <OrderModal />
    </Grid>
  );
};
