import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
       name: 'user',
       initialState: {
              isLoadingUsers: true,
          users:[],
             
       },
       reducers: {

        //!list
        onLoadUsersEvents:(state,{payload=[]})=>{
            state.isLoadingUsers=false;
            payload.forEach(user=>{
                const exists= state.users.some(dbUser=>dbUser.user_id === user.user_id);
                if(!exists){
                state.users.push(user);
                }
            })
            
        },

        onLogoutUser:(state)=>{
            state.isLoadingUsers=true;
            state.users=[];
        }
    }
});


// Action creators are generated for each case reducer function
export const { onLoadUsersEvents ,onLogoutUser} = userSlice.actions;