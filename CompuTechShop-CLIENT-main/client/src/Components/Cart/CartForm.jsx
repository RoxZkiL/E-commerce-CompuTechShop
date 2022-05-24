import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import styles from "./CartForm.module.css";
function CartForm({
  handleChange,
  handleSubmit,
  isSubmitting,
  values,
  errors,
}) {
  let allUsers = useSelector((state) => state.users2);
  const { user } = useAuth0();

  let userLocal = [];

  if (user) {
    localStorage.setItem("email", user.email);
  }

  userLocal.email = localStorage.getItem("email");

  let filteredUser = allUsers.filter((el) => el.email === userLocal.email);

  let address = filteredUser.map((el) => el.address);
  localStorage.setItem("address", address);

  return (
    <div className={styles.containerForm}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            m: 1,
            width: "45ch",
            color: "white",
            display: "flex",
          },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          variant="filled"
          id="outlined-required"
          label="Address"
          name="address"
          onChange={handleChange}
          value={values.address}
          error={errors.address ? true : false}
          helperText={errors.address}
          required
        />
        <TextField
          variant="filled"
          id="outlined-required"
          label="E-mail"
          name="email"
          onChange={handleChange}
          value={values.email}
          error={errors.email ? true : false}
          helperText={errors.email}
          required
        />
        <Button disabled={isSubmitting} type="submit" variant="outlined">
          Confirm purchase
        </Button>
      </Box>
    </div>
  );
}

export default CartForm;
