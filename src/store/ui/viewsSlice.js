import { createSlice } from "@reduxjs/toolkit";

export const viewsSlice = createSlice({
  name: "views",
  initialState: {
    currentViews: "dashboard", // Vista inicial
  },
  reducers: {
    onSetCurrentView: (state, { payload }) => {
      state.currentViews = payload;
      localStorage.setItem("currentView", payload);
    },

    onLoadCurrentView: (state) => {
      const currentView = localStorage.getItem("currentView");
      if (currentView) {
        state.currentViews = currentView;
      }
    },
    onLogoutViews: (state) => {
      state.currentViews = "dashboard";
  },
},
});

// Action creators are generated for each case reducer function
export const { 
       onSetCurrentView, 
       onLoadCurrentView,
       onLogoutViews
    } = viewsSlice.actions;
