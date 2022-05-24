import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./BasicForm.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Footer from "../Footer/Footer";

const BasicForm = ({
  handleChange,
  handleSubmit,
  isSubmitting,
  values,
  errors,
}) => {
  const { user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <div className={styles.basicForm}>
        <Box
          className={styles.form}
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
          <div>
            <h3 style={{ textAlign: "center" }}>Create User:</h3>
            {user.given_name ? (
              <TextField
                variant="filled"
                id="outlined-required"
                label="First Name"
                name="given_name"
                defaultValue={values.given_name}
                required
                disabled
              />
            ) : (
              <TextField
                variant="filled"
                id="outlined-required"
                label="First Name"
                name="given_name"
                onChange={handleChange}
                value={values.given_name}
                error={errors.given_name ? true : false}
                helperText={errors.given_name}
                required
              />
            )}

            {user.family_name ? (
              <TextField
                variant="filled"
                id="outlined-required"
                label="Last Name"
                name="family_name"
                defaultValue={values.family_name}
                required
                disabled
              />
            ) : (
              <TextField
                variant="filled"
                id="outlined-required"
                label="Last Name"
                name="family_name"
                onChange={handleChange}
                value={values.family_name}
                error={errors.family_name ? true : false}
                helperText={errors.family_name}
                required
              />
            )}

            {user.email ? (
              <TextField
                variant="filled"
                id="outlined-required"
                label="E-mail"
                name="email"
                defaultValue={values.email}
                required
                disabled
              />
            ) : (
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
            )}

            {user.nickname ? (
              <TextField
                variant="filled"
                id="outlined-required"
                label="Nickname"
                name="nickname"
                defaultValue={values.nickname}
                required
                disabled
              />
            ) : (
              <TextField
                variant="filled"
                id="outlined-required"
                label="Nickname"
                name="nickname"
                onChange={handleChange}
                value={values.nickname}
                error={errors.nickname ? true : false}
                helperText={errors.nickname}
                required
              />
            )}

            <TextField
              name="email_verified"
              value={values.email_verified}
              disabled
              required
              hidden
            />

            {user.picture ? (
              <TextField
                variant="filled"
                id="outlined-required"
                label="Picture"
                name="picture"
                defaultValue={values.picture}
                required
                disabled
              />
            ) : (
              <TextField
                variant="filled"
                id="outlined-required"
                label="Picture"
                name="picture"
                onChange={handleChange}
                value={values.picture}
                error={errors.picture ? true : false}
                helperText={errors.picture}
                required
              />
            )}

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
              label="Phone"
              name="phone"
              onChange={handleChange}
              value={values.phone}
              error={errors.phone ? true : false}
              helperText={errors.phone}
              required
            />

            <TextField
              sx={{ "& > :not(style)": { m: 0.1, height: "8ch" } }}
              type="date"
              variant="filled"
              id="outlined-required"
              label="Birthdate"
              name="birthday"
              onChange={handleChange}
              value={values.birthday}
              error={errors.birthday ? true : false}
              helperText={errors.birthday}
              required
            />

            <TextField
              name="is_admin"
              value={values.is_admin}
              disabled
              required
              hidden
            />

            <TextField
              name="is_admin_pro"
              value={values.is_admin}
              disabled
              required
              hidden
            />

            <TextField
              name="password"
              value={values.password}
              disabled
              required
              hidden
            />

            <TextField
              name="is_banned"
              value={values.is_banned}
              disabled
              required
              hidden
            />

            <div className={styles.createButton}>
              <Button disabled={isSubmitting} type="submit" variant="outlined">
                Create User
              </Button>
            </div>
          </div>
        </Box>
        <Footer />
      </div>
    )
  );
};

export default BasicForm;
