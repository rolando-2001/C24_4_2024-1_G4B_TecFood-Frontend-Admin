
import { useViewStore } from "../../hooks";
import { TecfoodLayout } from "../layout/TecfoodLayout";
import { CategoryView, NoteView, SelectedView, UserView } from "../views";


export const TecfoodPage = () => {
  const { currentViews } = useViewStore();

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
      default:
        return null;
    }
  };

  return (
    <TecfoodLayout>
      {renderView()}
    </TecfoodLayout>
  );
}