import { useDispatch, useSelector } from "react-redux";
import { tecfoodApi } from "../api/tecfoodApi";
import { onListcategorys } from "../store/dish/categorySlice";

export const useCategoryStore = () => {


   const dispatch = useDispatch();

   const {categorys }=useSelector(state=>state.category);

  const  startCategoryLoadingEvents= async()=>{
         try{
             const {data}= await tecfoodApi.get('/api/v1/dish-category/');
             dispatch(onListcategorys(data))
         }catch(error){
             console.log(error);
         }
      

  }

  return {
    //! properties
    categorys,

    //! methods
    startCategoryLoadingEvents,
    


  }
 
 
}
