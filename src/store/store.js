import { configureStore } from "@reduxjs/toolkit";
import { authSlice, uiSlice} from "./";
import { dishSlice } from "./dish/dishSlice";
import { viewsSlice } from "./ui/viewsSlice";
import { categorySlice } from "./dish/categorySlice";
import { userSlice } from "./user/userSlice";
import { orderSlice } from "./order/orderSlice";




export const store = configureStore({
  reducer: {
    dish: dishSlice.reducer,
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    views: viewsSlice.reducer,
    category: categorySlice.reducer,
    user: userSlice.reducer,
    order: orderSlice.reducer,

    
    
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
