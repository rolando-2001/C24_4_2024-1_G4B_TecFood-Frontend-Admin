import { useDispatch, useSelector } from "react-redux";
import { onLoadCurrentView, onSetCurrentView } from "../store/ui/viewsSlice";

export const useViewStore = () => {

  const dispatch = useDispatch();

  const {currentViews} = useSelector(state => state.views);

   // Función para cambiar la vista actual
   const setCurrentView = (viewName) => {
    dispatch(onSetCurrentView(viewName));
   };

   const getCurrentView = () => {
      dispatch(onLoadCurrentView())
   }

  return {
    //! Estado
    currentViews,

    //! metodos
    setCurrentView,
    getCurrentView

  };




};