import { useDispatch, useSelector } from "react-redux";
import {onCloseDateModal,onOpenDateModal} from "../store"

export const useUiStore = () => {

  //!dispatch
  const dispatch = useDispatch();

  const { isDateModalOpen} = useSelector((state) => state.ui);

  //!Metodos
   const openDateModal = () => {
    dispatch(onOpenDateModal());
   }

   //!Metodos
    const closeDateModal = () => {
      dispatch(onCloseDateModal());
    }
   
    //!Metodos
    const toggleDateModal = () => {
       (isDateModalOpen) 
       ? openDateModal()
       : closeDateModal();     
      
   }
    




  return {

    //! Propiedades
    isDateModalOpen,

    
    //! Metodos
    openDateModal,
    closeDateModal,
    //!
    toggleDateModal


  };
};
