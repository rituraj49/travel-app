import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

function Navbar() {
    const { keycloak } = useKeycloak();

    const handleLoginLogout = () => {
        if(keycloak.authenticated) {
            keycloak.logout();
        } else {
            keycloak.login();
        }
    }
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Mobile menu icon (can be hooked with Drawer if needed) */}
          <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
  
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
          >
            Voyage
          </Typography>
  
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} onClick={handleLoginLogout}>
              {keycloak.authenticated ? "Logout" : "Login"}
            </Button>
            {/* <Button color="inherit" component={Link} to="/contact">
              Contact
            </Button> */}
          </Box>
        </Toolbar>
      </AppBar>
    );
  };

export default Navbar;