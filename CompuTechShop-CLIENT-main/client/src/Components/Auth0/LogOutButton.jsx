import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from './LogOutButton.module.css'
import { TYPES } from "../../Redux/Actions/shoppingCartActions";
import { useDispatch } from "react-redux";

export default function LogOutButton() {
  const dispatch = useDispatch();
  const { logout } = useAuth0();

  const postUserActive = (userActive) => {

    dispatch({ type: TYPES.USER_ACTIVE, payload: userActive });
  };
  const handleOnClick = () => {
    postUserActive([])
    logout();
    localStorage.setItem('email', [])

  }
  return (
    <span onClick={handleOnClick}>Log Out</span>
  )
}

//const { logOutWithRedirect, isAuthenticated } = useAuth0();
// return (
//   isAuthenticated && (
//     <button onClick={() => logOutWithRedirect()}> Sign Out</button>
//   )
// )