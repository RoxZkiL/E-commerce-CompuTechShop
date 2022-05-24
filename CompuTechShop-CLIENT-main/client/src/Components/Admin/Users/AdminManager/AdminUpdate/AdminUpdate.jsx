import React, { useState } from "react";
import styles from "./AdminUpdate.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { postUser, updateUser } from "../../../../../Redux/Actions";
import AdminNav from "../../../AdminNav/AdminNav";
import AdminNav2 from "../../../AdminNav/AdminNav2";
import { useNavigate, useParams } from "react-router-dom";
import { MenuItem } from "@mui/material";
import Swal from "sweetalert2";

function AdminUpdate() {
    const dispatch = useDispatch();
    const {email} = useParams();
    const admin = useSelector((state) => state.users);
    const adminUpdate = admin.filter(admin => admin.email === email);
    const navigate = useNavigate();
    const Swal = require('sweetalert2')
    
    const [input, setInput] = useState({
        given_name: adminUpdate[0].given_name,
        family_name: adminUpdate[0].family_name,
        nickname: adminUpdate[0].nickname,
        email: adminUpdate[0].email,
        password: adminUpdate[0].password,
        is_admin: adminUpdate[0].is_admin ? true : false,
        email_verified: true,
        is_banned: adminUpdate[0].is_banned ? true : false
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
        dispatch(updateUser(adminUpdate[0].id , input))
        setInput({
            given_name: '',
            family_name: '',
            nickname: '',
            email: '',
            password: '',
            is_admin: false,
            is_banned: null
        })
        Swal.fire({
          title: 'User updated!',
          icon: 'success',
          confirmButtonText: 'Ok',
        })
        navigate('/admin/users')
    }

    // function handleCopy(e) {
    //     e.preventDefault()
    //     setInput({
    //         given_name: adminUpdate[0].given_name,
    //         family_name: adminUpdate[0].family_name,
    //         nickname: adminUpdate[0].nickname,
    //         email: adminUpdate[0].email,
    //         password: adminUpdate[0].password,
    //         is_admin: true

    //     })
    //   }


    function handleUpdateState(e){
      e.preventDefault()
      setInput({
          ...input,
          [e.target.name] : e.target.value
      })
    }
    function handleUpdateBanned(e){
      e.preventDefault()
      setInput({
          ...input,
          [e.target.name] : e.target.value
      })
    }


  return (
    <div className={styles.adminUpdate}>
    <AdminNav />
    <AdminNav2 />
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
        <h3 style={{ textAlign: "center" }}>Update User:</h3>
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
            <TextField
            sx={{
                '& > :not(style)': input.is_admin === false ? { m: .5,  } : { m:.5, color :'red'},
            }}
            style={{ m: .5, display: 'flex', width: '20ch', color:'white', margin:'auto'}}
            variant="filled"
            id="filled-select-currency"
            select
            name='is_admin'
            label="Is Admin"
            value={input.is_admin}
            onChange={(e) => handleUpdateState(e)}
            > 
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </TextField>
            <div style={{margin:'auto', display: 'flex', justifyContent:'center'}}>
              <TextField
              sx={{
                  '& > :not(style)': input.is_banned === false ? { m: .5, } : { m:.5, color :'red'},
              }}
              style={{ m: .5, display: 'flex', width: '20ch', color:'white', margin:'auto'}}
              variant="filled"
              id="filled-select-currency"
              select
              name='is_banned'
              label="Is Banned"
              value={input.is_banned}
              onChange={(e) => handleUpdateBanned(e)}
              > 
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
              </TextField>
            </div>
          <Button type="submit" variant="outlined" 
            style={{margin:'20px auto', display:'flex', color:'green', borderColor:'green'}}
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
            Update User
          </Button>
      </div>
    </Box>
  </div>
  )
}

export default AdminUpdate