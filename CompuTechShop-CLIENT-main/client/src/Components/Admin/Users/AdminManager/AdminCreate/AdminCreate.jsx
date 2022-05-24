import React, { useState } from "react";
import styles from "./AdminCreate.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { getUser, postUser } from "../../../../../Redux/Actions";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AdminCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Swal = require('sweetalert2')

    const [input, setInput] = useState({
        given_name: '',
        family_name: '',
        nickname: '',
        email: '',
        password: '',
        is_admin: true,
        email_verified: true
    })

    function handleInput(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postUser(input))
        setInput({
            given_name: '',
            family_name: '',
            nickname: '',
            email: '',
            password: '',
            is_admin: true,
            email_verified: true
        })
        Swal.fire({
          title: 'Admin created!',
          icon: 'success',
          confirmButtonText: 'Ok',
        })
        dispatch(getUser());
    }

  return (
    <div>
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
        <h3 style={{ textAlign: "center" }}>Create Admin:</h3>
          <TextField
            variant="filled"
            id="outlined-required"
            label="First Name"
            name="given_name"
            value={input.given_name}
            onChange={handleInput}
            required
          />
          <TextField
            variant="filled"
            id="outlined-required"
            label="Last Name"
            name="family_name"
            value={input.family_name}
            onChange={handleInput}
            required
          />
          <TextField
            variant="filled"
            id="outlined-required"
            label="E-mail"
            name="email"
            value={input.email}
            onChange={handleInput}
            required
          />
          <TextField
            variant="filled"
            id="outlined-required"
            label="Nickname"
            name="nickname"
            onChange={handleInput}
            value={input.nickname}
            required
          />
          <TextField
            id="standard-password-input"
            variant="filled"
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            onChange={handleInput}
            value={input.password}
            required
          />
          <Button type="submit" variant="outlined" 
            style={{margin:'auto', display:'flex', color: 'green', borderColor: 'green'}}
            disabled={
            input.name === '' ||
            input.given_name === '' ||
            input.family_name === '' ||
            input.email === '' ||
            input.nickname === '' ||
            input.password === '' ||
            input.name === ""
                ? true
                : false
            }
        >
            Create Admin
          </Button>
      </div>
    </Box>
  </div>
  )
}

export default AdminCreate