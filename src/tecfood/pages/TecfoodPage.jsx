
import { useEffect } from "react";
import {useViewStore } from "../../hooks";
import { TecfoodLayout } from "../layout/TecfoodLayout";
import { CategoryView, NoteView, OrderView, SelectedView, UserView } from "../views";
import {Toaster} from 'react-hot-toast';

export const TecfoodPage = () => {
  const { currentViews ,getCurrentView } = useViewStore();

  useEffect(() => {
    getCurrentView();
  }, []);

  // Renderiza la vista según la vista activa
  const renderView = () => {
    switch (currentViews) {
      case 'dish':
        return <NoteView />;
      case 'dashboard':
        return <SelectedView />;
      case 'user':
        return <UserView />;
      case 'category':
        return <CategoryView />;
      case 'order':
        return <OrderView/>;
      
      default:
        return null;
    }
  };

  return (
    <TecfoodLayout>
      <Toaster />
      {renderView()}
    </TecfoodLayout>
  );
}