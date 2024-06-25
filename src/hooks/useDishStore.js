import { useDispatch, useSelector } from "react-redux";
import { onAddDishEvent, onDeleteDishEvent, onLoadEvents, onSetDishsEvent, onUpdateDishEvent } from "../store/dish/dishSlice";
import { tecfoodApi } from "../api/tecfoodApi";



export const useDishStore = () => {

    //!dispatch
    const dispatch = useDispatch();
   


   //! dishSlice
    const {dishs,activeEvent } = useSelector(state => state.dish);

    //!Metodos 
    // TODO: Selecionar un Dish y pasar al formulario
    const setDishEvent=(dishEvent)=>{
          dispatch(onSetDishsEvent(dishEvent));
    }


    //! new Dish
    const startDishEvent=async(dishEvent)=>{
        // TODO :llegar al backend y guardar el dish

        
        //TODO: guardar en la base de datos
        try{
            if(dishEvent.dish_id){
                //! actualizar
                await tecfoodApi.put(`/api/v1/dish/${dishEvent.dish_id}/`,dishEvent)
                dispatch(onUpdateDishEvent({...dishEvent}));
            }else{
                //! Nuevo 
               console.log(dishEvent);            
                const {data}= await tecfoodApi.post("/api/v1/dish/",dishEvent);
                
    
                dispatch(onAddDishEvent({...dishEvent,dish_id:data.dish.dish_id}));
    
            }

        }catch(error){
            console.log(error);
        }

    }

    //!Metodo Delete
    const deleteDishEvent=async()=>{
       try{
       
         
        await tecfoodApi.delete(`/api/v1/dish/${activeEvent.dish_id}/`);
        dispatch(onDeleteDishEvent());
       }catch(error){
           console.log(error);
       }
    }

   
    //! Listar
    const startLoadingEvents=async()=>{
        try{
            const {data}= await tecfoodApi.get("/api/v1/dish/");
            
            
           
            dispatch(onLoadEvents(data.dish))
        }catch(error){
            console.log(error);
        }
    }



  



    return{

        //! Propiedades
        dishs,
        activeEvent,
       
        //! Metodos
        setDishEvent,
        startDishEvent,
        deleteDishEvent,

        //!LisTar
        startLoadingEvents

    }
}