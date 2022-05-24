import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./LoginButton.module.css";
import { useNavigate } from "react-router-dom";

function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  
  return (
    <button
      className={styles.logInButton}
      onClick={() => {
        loginWithRedirect();
      }}
      // onSubmit={(e) => handleSubmit(e)}
    >
      <p>Log in</p>
    </button>
  );
}

export default LoginButton;

//const { loginWithRedirect, isAuthenticated } = useAuth0();
// return (
//   !isAuthenticated && (
//     <button onClick={() => loginWithRedirect()}> Sign In</button>
//   )
// )
