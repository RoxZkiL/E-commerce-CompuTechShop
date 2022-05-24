import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Profile from "../../Auth0/Profile.jsx";
import LoginButton from "../../Auth0/LoginButton.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBarAdmin from '../SearchBarAdmin/SearchBarAdmin'
import { darkMode } from "../../../Redux/Actions/index.js";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import styles from "./AdminNav.module.css";
import { Button } from "@mui/material";

function AdminNav() {
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    dispatch(darkMode(!isDarkTheme));
  };
  return (
    <div>
      <nav className={styles.adminNavBar}>
        <Link to="/">
          <div className={styles.logo} />
        </Link>
        <div className={styles.searchBarCall}>
          <SearchBarAdmin/>
        </div>
        {/* <IconButton sx={{ ml: 1 }} onClick={changeTheme} color="primary">
          {isDarkTheme ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton> */}
        <div className={styles.auth0}>
          {isAuthenticated ? <Profile /> : <LoginButton />}
        </div>
      </nav>
    </div>
  );
}

export default AdminNav