import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { Home, People, ShoppingCart, Category, Receipt, Assessment, Settings, RestaurantMenu } from "@mui/icons-material";
import { useAuthStore } from "../../services/useAuthStore";
import { useViewStore } from "../../hooks";

// eslint-disable-next-line react/prop-types
export const SideBar = ({drawerWidth=240}) => {
  const { user } = useAuthStore();
  
  
  const {setCurrentView } =useViewStore();


  return (
    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open={true}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        <Toolbar>
          <Typography variant="h6" component='div' fontSize={30} color="textSecondary">
            {user.name.toUpperCase()}
            {user.role ==='ROLE_ADMIN' ? ' ADMIN' : 'USER'}
          </Typography>
        </Toolbar>
        <Divider  />
        <List>

          <ListItem disablePadding>
            <ListItemButton
            
            onClick={()=>setCurrentView('dashboard')}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <Grid>
                <ListItemText
                
                primary="dashboard" />
              </Grid>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>setCurrentView('user')}>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <Grid>
                <ListItemText primary="Usuarios" />
              </Grid>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>setCurrentView('dish')}>
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <Grid>
                <ListItemText primary="Platillos" />
              </Grid>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>setCurrentView('category')}>
              <ListItemIcon>
                <Category />
              </ListItemIcon>
              <Grid>
                <ListItemText primary="Categorias" />
              </Grid>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>setCurrentView('order')}>
              <ListItemIcon>
                <Receipt />
              </ListItemIcon>
              <Grid>
                <ListItemText primary="Pedidos" />
              </Grid>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Assessment />
              </ListItemIcon>
              <Grid>
                <ListItemText primary="Reportes" />
              </Grid>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <Grid>
                <ListItemText primary="Configuracion" />
              </Grid>
            </ListItemButton>
          </ListItem>

        </List>

        <Box sx={{ flexGrow: 1 }} />

        <Divider />

        <Box sx={{ p: 2, textAlign: 'center', mt: 4 }}  borderRadius={10}>
          <ListItemIcon sx={{ textAlign: 'center', fontSize: 40 }}>
            <RestaurantMenu fontSize="large" />
          </ListItemIcon>
          <Typography variant="h6" fontSize={30} color="textSecondary" sx={{ mt: 1 }}>
            Tecfood
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Dhashord
          </Typography>
        </Box>

      </Drawer>
    </Box>
  );
}
