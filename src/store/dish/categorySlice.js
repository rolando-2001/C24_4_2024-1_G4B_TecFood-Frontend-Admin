import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
       name: 'category',
       initialState: {
        isLoadingCategoryEvents: true,
          categorys: [],
       },
       reducers: {
      onListcategorys: (state,{payload=[]}) => {
        
        payload.forEach(category=>{
            
            state.isLoadingCategoryEvents=false;
            const exists= state.categorys.some(dbCategory=>dbCategory.dish_category_id === category.dish_category_id);
            if(!exists){
                state.categorys.push(category);
            }
            
        })

      },
    }
});


// Action creators are generated for each case reducer function
export const {
       onListcategorys
        } = categorySlice.actions;