import { useDispatch, useSelector } from "react-redux";
import { tecfoodApi } from "../api/tecfoodApi";
import {
   onAddOrderEvent,
  onDeleteOrderEvent,
  onSetOrderEvent,
  onUpdateOrderEvent,
  ongetOrdersEvents,
} from "../store/order/orderSlice";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";

export const useOrderStore = () => {
  const dispatch = useDispatch();
  const { orders, orderActive } = useSelector((state) => state.order);

  const setOrderEvent = (order) => {
    dispatch(onSetOrderEvent(order));
  };

  //!! order new and update

  const startOrderEvent = async (order) => {
    try {
      if (order.order_id) {
        await tecfoodApi.put(`/api/v1/order-dish/${order.order_id}/`, order);
        dispatch(onUpdateOrderEvent({ ...order }));
      } else {
        const { data } = await tecfoodApi.post("/api/v1/order-dish/", order);
        dispatch(onAddOrderEvent({ ...order, order_id: data.order.order_id }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const startDeleteOrder=async(order)=>{
    try {
       await tecfoodApi.delete(`/api/v1/order-dish/${order.order_id}/`);
       
       dispatch(onDeleteOrderEvent(order))
    } catch (error) {
      console.log(error)
      
    }
  }
  
  const getListOrders = async () => {
    try {
      const { data } = await tecfoodApi.get("/api/v1/order-dish/");
     const orders =convertEventsToDateEvents(data.order);
      console.log(orders)
      dispatch(ongetOrdersEvents(orders));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    orders,
    orderActive,

    getListOrders,
    setOrderEvent,
    startOrderEvent,
    startDeleteOrder
  };
};
