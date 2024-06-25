import { useDispatch, useSelector } from "react-redux";
import { tecfoodApi } from "../api/tecfoodApi"
import { onLoadUsersEvents } from "../store/user/userSlice";

export const useUserStore = () => {

  const dispatch = useDispatch();
  const {users}=useSelector(state=>state.user);
   
   const  startLoadingUsersEvents=async()=>{

        try{
         const {data} = await tecfoodApi.get('/api/users/')
          dispatch(onLoadUsersEvents(data))
        }catch(error){
            console.log(error)
        }

    }


  return {
    //! properties
    users,

    //! methods
    startLoadingUsersEvents

  }
}
