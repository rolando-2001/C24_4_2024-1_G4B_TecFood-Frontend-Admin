import { useDispatch, useSelector } from "react-redux";
import { tecfoodApi } from "../api/tecfoodApi";
import {
  onAddCategoryEvent,
  onDeleteCategoryEvent,
  onListcategorys,
  onSetCategoryEvent,
  onUpdateCategoryEvent,
  
} from "../store/dish/categorySlice";
import { successToast } from "../helpers/showToast";

export const useCategoryStore = () => {
  const dispatch = useDispatch();

  const { categorys, activeCategoryEvent } = useSelector(
    (state) => state.category
  );

  const setCategoryEvent = (categoryEvent) => {
    dispatch(onSetCategoryEvent(categoryEvent));
  };

  //! Create and Update Category
  const startCategoryEvent = async (categoryEvent) => {
    try {
      if (categoryEvent.dish_category_id) {
        await tecfoodApi.put(
          `/api/v1/dish-category/${categoryEvent.dish_category_id}/`,
          categoryEvent
        );
        successToast("Categoria actualizada", "success")
        dispatch(onUpdateCategoryEvent({ ...categoryEvent }));
      } else {
        const { data } = await tecfoodApi.post(
          "/api/v1/dish-category/",
          categoryEvent
        );
        successToast("Categoria creada", "success")
        dispatch(
          onAddCategoryEvent({
            ...categoryEvent,
            dish_category_id: data.dish_category_id,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  //! Delete Category
  const startDeleteCategoryEvent=(category)=>{
    try {
      tecfoodApi.delete(`/api/v1/dish-category/${category.dish_category_id}/`);
      successToast("Categoria eliminada", "error")
      dispatch(onDeleteCategoryEvent(category));
      dispatch(onSetCategoryEvent(null));
    } catch (error) {
      console.log(error);
    }
    
  }

  //! List categorys
  const startCategoryLoadingEvents = async () => {
    try {
      const { data } = await tecfoodApi.get("/api/v1/dish-category/");
      console.log(data);
      dispatch(onListcategorys(data));
    } catch (error) {
      console.log(error);
    }
  };



  return {
    //! properties
    categorys,
    activeCategoryEvent,

    //! methods
    startCategoryLoadingEvents,
    setCategoryEvent,
    startCategoryEvent,
    startDeleteCategoryEvent,

    
    
  };
};
