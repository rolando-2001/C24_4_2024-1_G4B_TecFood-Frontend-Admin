import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useAuthStore } from "../../services/useAuthStore";

// eslint-disable-next-line react/prop-types
export const NavBar = ({ drawerWidth = 240 }) => {

  const {startLogout} =useAuthStore();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontSize={30}>TECFOOD</Typography>

          <IconButton onClick={startLogout}>
            <LogoutOutlined color="error"  />

          </IconButton>


        </Grid>
      </Toolbar>
    </AppBar>
  );
};
