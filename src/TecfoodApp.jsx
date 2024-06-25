import { AppRouter } from "./router";
import { store } from "./store";
import { Provider } from "react-redux";
import { AppTheme } from "./theme";

export const TecfoodApp = () => {
  return (
    <Provider store={store}>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </Provider>
  );
};
