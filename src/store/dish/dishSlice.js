import { createSlice } from '@reduxjs/toolkit';






export const dishSlice = createSlice({
       name: 'dish',
       initialState: {
          isLoadingEvents: true,
          dishs:[
            
        ],
          activeEvent: null,
       },
       reducers: {
          //! 
            onSetDishsEvent: (state,{payload}) => {
                state.activeEvent = payload;
            },
            onAddDishEvent: (state,{payload}) => {
                state.dishs.push(payload);
                state.activeEvent = null;
            },

            onUpdateDishEvent: (state,{payload}) => {
              state.dishs = state.dishs.map(dish=>{
                 if(dish.dish_id === payload.dish_id){
                    state.activeEvent = null;
                   return payload;
                 }
                return dish;
              });
              
            },
            onDeleteDishEvent: (state) => {
                if(state.activeEvent){
                    state.dishs = state.dishs.filter(dish=> dish.dish_id !== state.activeEvent.dish_id);
                    state.activeEvent = null;
                }

            },
            onLoadEvents: (state,{payload=[]}) => {
               
                state.isLoadingEvents=false;
                
                payload.forEach(dish=>{
                  
                  
                  const exists= state.dishs.some(dbDish=>dbDish.dish_id === dish.dish_id);
                  
                  if(!exists){
                    state.dishs.push(dish);
                  }
                })

            },

    }
});


// Action creators are generated for each case reducer function
export const { onSetDishsEvent,onAddDishEvent,onDeleteDishEvent,onUpdateDishEvent,onLoadEvents } = dishSlice.actions;