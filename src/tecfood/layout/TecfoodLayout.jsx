import { Box, Toolbar } from "@mui/material";

import { SideBar,NavBar } from "../components";

const drawerWidth =300;

// eslint-disable-next-line react/prop-types
export const TecfoodLayout = ({children}) => {
  return (
    <Box sx={{display: 'flex'}}>
        
        <NavBar drawerWidth={ drawerWidth }/>

        <SideBar drawerWidth={drawerWidth}/>
     
        {/* Sidebar */}


        <Box 
          component='main'
          sx={{flexGrow: 1, p: 3}}
        
        >


            <Toolbar/> 
            { children }



        </Box>


    </Box>
  )
}
