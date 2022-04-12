import React from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { out } from "../../store/reducers/auth.reducer";
import { useCookies } from "react-cookie";

function AvatarUser() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const { user } = useSelector((state) => state.auth);

  const [,, removeCookie] = useCookies(["user"]);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const toHome = () => {
    setAnchorElUser(null)
    navigate ({
      pathname: "login"
    })
  }
  const logOut = ()=> {
    setAnchorElUser(null)
    dispatch(out(null))
    console.log(document.cookie);
    removeCookie('user')

  }

  
  
  console.log(user);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {user ? (
            <Avatar
              alt="Remy Sharp"
              src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png"
            />
          ) : (
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          )}
        </IconButton>
      </Tooltip>

      {user ? (
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={toHome}>
            <Typography textAlign="center">Моя страница</Typography>
          </MenuItem>
          <MenuItem onClick={logOut}>
            <Typography textAlign="center">Выйти</Typography>
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Вoйти</Typography>
          </MenuItem>
        </Menu>
      )}
    </Box>
  );
}

export default AvatarUser;
