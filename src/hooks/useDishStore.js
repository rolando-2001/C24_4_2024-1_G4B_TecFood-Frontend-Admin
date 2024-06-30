import { useDispatch, useSelector } from "react-redux";
import { onAddDishEvent, onDeleteDishEvent, onLoadEvents, onSetDishsEvent, onUpdateDishEvent } from "../store/dish/dishSlice";
import { tecfoodApi } from "../api/tecfoodApi";



export const useDishStore = () => {
    
    const dispatch = useDispatch();
    const { dishs, activeEvent } = useSelector(state => state.dish);
  
    const setDishEvent = (dishEvent) => {
      dispatch(onSetDishsEvent(dishEvent));
    }
  
    const startDishEvent = async (dishEvent) => {
      try {

        if (dishEvent.dish_id) {
          await tecfoodApi.put(`/api/v1/dish/${dishEvent.dish_id}/`, dishEvent)
          dispatch(onUpdateDishEvent({ ...dishEvent }));
        } else {
          const { data } = await tecfoodApi.post("/api/v1/dish/", dishEvent);
          console.log(data.dish.dish_id);
          dispatch(onAddDishEvent({ ...dishEvent, dish_id: data.dish.dish_id }));
        }
        
      } catch (error) {
        console.log(error);
      }
    }
  
    const deleteDishEvent = async (dish) => {
      try {
        await tecfoodApi.delete(`/api/v1/dish/${dish.dish_id}/`);
        dispatch(onDeleteDishEvent(dish));
        dispatch(onSetDishsEvent(null));
      } catch (error) {
        console.log(error);
      }
    }
  
    const startLoadingEvents = async () => {
      try {
        const { data } = await tecfoodApi.get("/api/v1/dish/");
        dispatch(onLoadEvents(data.dish))
      } catch (error) {
        console.log(error);
      }
    }
  
    return {
      dishs,
      activeEvent,


      setDishEvent,
      startDishEvent,
      deleteDishEvent,
      startLoadingEvents
    }
  }
  