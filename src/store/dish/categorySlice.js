import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    isLoadingCategoryEvents: true,
    categorys: [],
    activeCategoryEvent: null,
  },
  reducers: {
    onSetCategoryEvent: (state, { payload }) => {
      state.activeCategoryEvent = payload;
    },

    onAddCategoryEvent: (state, { payload }) => {
      state.categorys.push(payload);
      state.activeCategoryEvent = null;
    },

    onUpdateCategoryEvent: (state, { payload }) => {
      state.categorys = state.categorys.map((category) => {
        if (category.dish_category_id === payload.dish_category_id) {
          return payload;
        }
        return category;
      });
      state.activeCategoryEvent = null;
    },
    onDeleteCategoryEvent: (state, { payload }) => {
      state.categorys = state.categorys.filter(
        (category) => category.dish_category_id !== payload.dish_category_id
      );
      state.activeCategoryEvent = null;
    },

    onListcategorys: (state, { payload = [] }) => {
      payload.forEach((category) => {
        state.isLoadingCategoryEvents = false;
        const exists = state.categorys.some(
          (dbCategory) =>
            dbCategory.dish_category_id === category.dish_category_id
        );
        if (!exists) {
          state.categorys.push(category);
        }
      });
    },
    onLogoutCategory: (state) => {
      state.isLoadingCategoryEvents = true;
      state.categorys = [];
      state.activeCategoryEvent = null;
    },
    

  },
});

// Action creators are generated for each case reducer function
export const {
  onListcategorys,
  onSetCategoryEvent,

  onAddCategoryEvent,
  onUpdateCategoryEvent,
  onDeleteCategoryEvent,
  onLogoutCategory,


} = categorySlice.actions;
