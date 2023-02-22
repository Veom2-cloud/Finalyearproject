import { useTheme } from "@emotion/react";
import {
  Avatar,
  IconButton,
  Stack,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "react-icons/ai";
import "react-icons/ri";
import {
  AiFillFileText,
  AiFillHome,
  AiFillMessage,
  AiOutlineShop,
  AiOutlineSearch,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logoutUser } from "../helpers/authHelper";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";
import { RiContrast2Line } from "react-icons/ri";
import "./timeline.css";

const Navbar = () => {
  const navigate = useNavigate();
  const user = isLoggedIn();
  const theme = useTheme();
  const username = user && isLoggedIn().username;
  const [search, setSearch] = useState("");
  const [searchIcon, setSearchIcon] = useState(false);
  const [width, setWindowWidth] = useState(0);

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const mobile = width < 500;
  const navbarWidth = width < 600;

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const handleLogout = async (e) => {
    logoutUser();
    navigate("/login");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search?" + new URLSearchParams({ search }));
  };

  const handleSearchIcon = (e) => {
    setSearchIcon(!searchIcon);
  };
  const searchBoxStyle = {
    borderRadius: 20,
    flexGrow: 1,
    maxWidth: 300,
  };
  return (
    <Stack mb={2}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pt: 2,
          pb: 0,
        }}
        spacing={!mobile ? 2 : 0}
      >
        <HorizontalStack>
          <AiFillFileText
            size={33}
            color={theme.palette.primary.main}
            onClick={() => navigate("/")}
          />
          <Typography
            sx={{ display: mobile ? "none" : "block" }}
            variant={navbarWidth ? "h6" : "h4"}
            mr={1}
            color={theme.palette.primary.main}
          >
            {/* <Link to="/" color="inherit"> */}
            Ustar
            {/* </Link> */}
          </Typography>
        </HorizontalStack>

        {!navbarWidth && (
          <Box className="searchBox" component="form" onSubmit={handleSubmit}>
            <TextField
              size="small"
              label="Search for posts..."
              sx={searchBoxStyle}
              onChange={handleChange}
              value={search}
            />
          </Box>
        )}

        <HorizontalStack>
          {mobile && (
            <IconButton onClick={handleSearchIcon}>
              <AiOutlineSearch />
            </IconButton>
          )}

          <IconButton component={Link} to={"/"}>
            <AiFillHome />
          </IconButton>
          {user ? (
            <>
              <IconButton component={Link} to={"/messenger"}>
                <AiFillMessage />
              </IconButton>
              {user.userId == "63b02c400483b301cf061906" ? (
                <IconButton component={Link} to={"/admin"}>
                  <AdminPanelSettingsIcon />
                </IconButton>
              ) : (
                ""
              )}
              {user.userId == "63b024b920f227754490c428" ? (
                <IconButton component={Link} to={"/superadmin"}>
                  <AdminPanelSettingsIcon />
                </IconButton>
              ) : (
                ""
              )}

              {user.userId == "63f4ba9c37aab2240592b8e0" ? (
                <IconButton component={Link} to={"/canteenadmin"}>
                  <AdminPanelSettingsIcon />
                </IconButton>
              ) : (
                ""
              )}

              <IconButton component={Link} to={"/users/" + username}>
                <UserAvatar width={30} height={30} username={user.username} />
              </IconButton>
              {/* <Button onClick={handleLogout}>Logout</Button> */}
              {/* <Button variant="contained" endIcon={<LogoutIcon />} onClick={handleLogout}>
                Logout
              </Button> */}
              <IconButton color="primary" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Button variant="text" sx={{ minWidth: 80 }} href="/signup">
                Sign Up
              </Button>
              <Button variant="text" sx={{ minWidth: 65 }} href="/login">
                Login
              </Button>
            </>
          )}
        </HorizontalStack>
      </Stack>
      {/* {navbarWidth && searchIcon && (
        <Box component="form" onSubmit={handleSubmit} mt={2}>
          <TextField
            size="small"
            label="Search for posts..."
            fullWidth
            onChange={handleChange}
            value={search}
          />
        </Box>
      )} */}
    </Stack>
  );
};

export default Navbar;
