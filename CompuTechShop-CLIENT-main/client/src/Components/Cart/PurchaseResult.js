import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { getPayment } from "../../Redux/Actions/index";
import styles from "./PurchaseResult.module.css";
import { Button } from "@mui/material";
import { TYPES } from "../../Redux/Actions/shoppingCartActions";
import { Link } from "react-router-dom";
import Profile from "../Auth0/Profile";
export const PurchaseResult = () => {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const navigate = useNavigate();
  const obj = {};
  let { search } = useLocation();
  let query = new URLSearchParams(search);
  let payment = query.get("payment_id");
  let status = query.get("collection_status");
  let mensaje = "";

  obj.payment = payment;
  obj.email = window.localStorage.getItem("email");

  obj.extraEmail = window.localStorage.getItem("extraEmail");
  obj.extraAddress = window.localStorage.getItem("extraAddress");

  const postUserActive = (userActive) => {
    dispatch({ type: TYPES.USER_ACTIVE, payload: userActive });
  };
  const clearCart = () => {
    dispatch({ type: TYPES.CLEAR_CART });
  };

  localStorage.removeItem("carrito");

  function handleClick(e) {
    e.preventDefault();
    if (user) {
      postUserActive(user);
      dispatch(getPayment(obj));
      localStorage.removeItem("extraEmail");
      localStorage.removeItem("extraAddress");
      if (status !== "null") {
        clearCart();
      }
      navigate("/");
    }
  }
  switch (status) {
    case "approved":
      mensaje =
        "Your payment is approved, Thank you for shopping on our website.";
      break;
    case "in_process":
      mensaje =
        "Your payment is pending, we will inform you by mail. Thank you for shopping on our website.";
      break;
    case "rejected":
      mensaje =
        "Your payment is rejected, you can try making the purchase again with another card";
      break;
    default:
      mensaje = "Something went wrong";
      break;
  }

  return (
    <div className={styles.purchaseResult}>
      <div className={styles.productNotFound}>
        <div className={styles.productNotFoundContainer}>
          <h1>{mensaje}</h1>
          <div className={styles.productNotFoundText}>
          </div>
        </div>
        <div className={styles.hideProduct}>
          <Profile />
        </div>
      </div>
      <Link to="/">
        <Button variant="outlined" className={styles.backToSite} onClick={(e) => handleClick(e)}> Back to Site</Button>
      </Link>
    </div>
  );
};
