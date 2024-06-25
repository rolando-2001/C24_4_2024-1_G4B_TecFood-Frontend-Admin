import { StarOutline } from "@mui/icons-material"
import { Grid } from "@mui/material"




export const SelectedView = () => {
  return (
    <Grid
    container
    
    direction={"column"}
    alignItems={"center"}
    justifyContent={"center"}
    sx={{ minHeight: 'calc(85vh)', backgroundColor: "primary.main", padding: 3}}
  >
   
   <Grid
    item xs={12}>
    <StarOutline sx={{fontSize: 100,color:'white'}}/>
   

   </Grid>
   
  
  


 </Grid>
  )
}
