import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDateModalOpen: false,
  },
  reducers: {
    onOpenDateModal: (state) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => { // Renombrado para seguir una convención de nombres más común
      state.isDateModalOpen = false;
    },
  },
});


export const { onCloseDateModal, onOpenDateModal } = uiSlice.actions;


