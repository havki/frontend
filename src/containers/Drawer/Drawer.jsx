import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink, Outlet } from "react-router-dom";
import AddBoxIcon from '@mui/icons-material/AddBox';
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch, useSelector } from "react-redux";
import { filterCat } from "../../store/reducers/recipes.reducer";
import { recipesFetch } from "../../store/reducers/recipes.reducer";
import AvatarUser from "../AvatarUser/AvatarUser";


const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch()
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const filter = async (id) => {

  dispatch(recipesFetch(id)); 
  
 
  }


  const {category} = useSelector((state)=> state.recipes)
  const {user} = useSelector((state)=> state.auth)




  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Divider />
      <List>
        {
          
          <ListItem button id={null} onClick={(e)=>filter(e.target.id)}  >
            <ListItemIcon>
               <InboxIcon /> 
            </ListItemIcon>
            <ListItemText primary= "Все блюда" />
          </ListItem>
        }
      </List>
      <List>
        {category && category.map((text, index) => (
         
          <ListItem button onClick={()=>filter(text.id)}  key={text.id}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text.attributes.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar  sx= {{justifyContent:"space-between",sm:{justifyContent:"center"}}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" >
            
            {user && <NavLink
              style={{ textDecoration: "none", color: "white" }}
              className="link"
              to={"/addrecipe"}
            >
             <AddBoxIcon/> Add
            </NavLink>
            }
            <NavLink
              style={{ textDecoration: "none", color: "white",marginLeft: "50px" }}
              className={({ isActive }) =>
                isActive ? "bg-green-500 font-bold" : "bg-red-500 font-thin"
              }
              to={"/recipes"}
            >
              <SoupKitchenIcon /> All
            </NavLink>
           
          </Typography>
          {
            user ? 
            <AvatarUser/>
            :
            <NavLink
            style={{ textDecoration: "none", color: "white",marginLeft: "50px", }}
            className={({ isActive }) =>
              isActive ? "bg-green-500 font-bold" : "bg-red-500 font-thin"
            }
            to={"/login"}
          >
            <LoginIcon/> Log In
          </NavLink>
          }
        </Toolbar>


      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
