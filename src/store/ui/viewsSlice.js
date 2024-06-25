import { createSlice } from '@reduxjs/toolkit';

export const viewsSlice = createSlice({
       name: 'views',
       initialState: {
          currentViews: 'dashboard', // Vista inicial
       },
       reducers: {
            onSetCurrentView: (state,{payload}) => {
                state.currentViews = payload;
            },

    }
});


// Action creators are generated for each case reducer function
export const {onSetCurrentView } = viewsSlice.actions;

