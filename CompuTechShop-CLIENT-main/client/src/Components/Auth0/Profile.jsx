import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getUser, authenticate, getOrdersByEmail } from "../../Redux/Actions/index.js";
import styles from "./Profile.module.css";
import { Dropdown } from "react-bootstrap";
import LogOutButton from "./LogOutButton";
import SelectInput from "@mui/material/Select/SelectInput";

export default function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users)
  const auth0Email = user?.email
  const userLogged = users?.length > 0 ? users?.find(e => (e.email === auth0Email)) : false;
  // console.log(userLogged)

  let myUsers = useSelector((state) => state.users2);

  useEffect(() => {
    dispatch(getUser())
    dispatch(authenticate(userLogged))
    dispatch(getOrdersByEmail(user?.email));
  }, [dispatch])
  // console.log(user);

  // let allUsers = useSelector((state) => state.users2);
  // let userLocal = [];
  // if (user) {
  //   localStorage.setItem("email", user.email);
  // }

  // userLocal.email = localStorage.getItem("email");
  // let filteredUser = allUsers.filter((el) => el.email === userLocal.email);
  // console.log(filteredUser)

  return (
    isAuthenticated && (
      <div className={styles.profile}>
        <Dropdown className={styles.dropDown} active="false">
          <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
            <img
              className={styles.profileImg}
              src={user.picture || user.image}
              alt="profileImg"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu
            className={styles.dropMenu}
            focusFirstItemOnShow="false"
            variant="dark"
          >
            <Dropdown.Item href={"/profile"} >My Profile</Dropdown.Item>
            <Dropdown.Item href={"/profile/myorders"}>My Orders</Dropdown.Item>
            {
              userLogged?.is_admin ?
                <Dropdown.Item href={"/admin"}>Admin</Dropdown.Item>
              : null
            }
            {/* <Dropdown.Item href="/admin">My Orders</Dropdown.Item> */}
            <Dropdown.Divider />
            <Dropdown.Item href="" className={styles.logOutMenu}>
              <LogOutButton />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  );
}
