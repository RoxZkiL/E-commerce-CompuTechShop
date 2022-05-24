import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Profile from "../Auth0/Profile.jsx";
import LoginButton from "../Auth0/LoginButton.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "../SearchBar/SearchBar";
import { darkMode } from "../../Redux/Actions/index.js";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import styles from "./NavBar.module.css";
import ShoppingCart from "../Cart/ShoppingCart.jsx";
import WishlistNav from "../Wishlist/WishlistNav/WishlistNav.jsx";
// import Profile2 from "../Auth0/Profile2.jsx";


function NavBar() {
  const { isAuthenticated } = useAuth0();
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const dispatch = useDispatch();

  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    dispatch(darkMode(!isDarkTheme));
  };
  
  return (
    <div>
      <nav className={styles.NavBar}>
        <Link to="/">
          <div className={styles.logo} />
        </Link> 
        <div className={styles.searchBarCall}>
          <SearchBar />
        </div>
        <div className={styles.wishlistNav}>
          <WishlistNav />
        </div>
        <div className={styles.shoppignCartNav}>
          <ShoppingCart/>
        </div>
        {/* <IconButton className={styles.darkMode} onClick={(e) => changeTheme(e)} color="primary">
          {isDarkTheme ? <Brightness4Icon className={styles.darkMode}/> : <Brightness7Icon className={styles.darkMode}/>}
        </IconButton> */}
        <div className={styles.auth0}>
          {isAuthenticated ? <Profile /> : <LoginButton />}
        </div>
        {/* <div className={styles.auth0}>
          {isAuthenticated ? <Link to='/form'><button>Sign In</button></Link> : <p>.</p>}
        </div> */}
      </nav>
    </div>
  );
}

export default NavBar;
