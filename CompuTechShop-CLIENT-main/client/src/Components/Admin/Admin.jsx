import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { authenticate, getShops, getUser } from "../../Redux/Actions";
import styles from './Admin.module.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import NavBar from '../NavBar/Navbar';
import { TextField } from '@mui/material';

function Admin() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    nickname: '',
    password: ''
  })

  const [inputError, setInputError] = useState({
    nickname: '',
    password: ''
  })
  const users = useSelector((state) => state.users)

  function handleAdmin(e) {
    const user = users.filter(e => (e.nickname === input.nickname && e.password === input.password && e.is_admin))
    // console.log(user)
    // if (users.map(e => (e.nickname === input.nickname && e.password === input.password && e.is_admin) ? true : false)[0]) {
    if (user.length > 0) {
      dispatch(authenticate(user[0]))
    } else {
      e.preventDefault(); 
      setInputError({
        nickname: 'Authentication invalid',
        password: 'Authentication invalid'
      })
    }
  }

  function handleInput(e) {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
    setInputError('')
  }

  return (
    <div className={styles.admin}>
      <NavBar />
      <div className={styles.adminContainer}>
        <div className={styles.adminCard}>
            <div className={styles.password}>
                <TextField
                  label="Nickname"
                  autoComplete="current-password"
                  variant="outlined"
                  name="nickname"
                  error={inputError.nickname ? true : false}
                  onChange={handleInput}
                  style={{width:'36ch'}}
                />
            </div>
            <div className={styles.password}>
                <TextField
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  name="password"
                  error={inputError.password ? true : false}
                  onChange={handleInput}
                  helperText={inputError.password}
                  style={{width:'36ch'}}
                />
            </div>
            <div className={styles.loginAdmin}>
              <Link to='/admin/products/Allproducts'>
                <Button onClick={handleAdmin} variant="outlined">Admin Login</Button>
              </Link>
            </div>
        </div>
     </div>
    </div>
  )
}

export default Admin