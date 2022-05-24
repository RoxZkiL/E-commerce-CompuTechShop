import React, { useState, useEffect} from 'react'
import { getShopById, getUser, updateShop } from '../../../../Redux/Actions'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NotFound404 from '../../../NotFound404/NotFound404';
import AdminNav from '../../AdminNav/AdminNav'
import AdminNav2 from '../../AdminNav/AdminNav2';
import { TextField, MenuItem, Button } from '@mui/material/';
import styles from './ShopDetails.module.css'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';

function ShopDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams();
  const shop = useSelector ((state) => state.shopDetail);
  const Swal = require('sweetalert2')
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    display:'flex',
    justifyContent:'space-between' ,
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    dispatch(getShopById(id));
    dispatch(getUser());
    // console.log('usuario',shop[0].state)
    setUpdate('')
  }, [dispatch]);

  
  let users = useSelector((state) => state.users);
  let state;
  let user;
  if(shop.length) {
    user = users.filter(u => u.id === shop[0].userId)
    state = shop[0].state
  }
  const [update, setUpdate] = useState(state)

  function handleUpdateState(e){
    e.preventDefault()
    setUpdate(e.target.value)
  }

  function handleClick(e){
    e.preventDefault()
    dispatch(updateShop(id, {state: update}))
    Swal.fire({
      title: 'Order updated!',
      icon: 'success',
      confirmButtonText: 'OK',
    })
    setUpdate('')
    navigate('/admin/allorders')
    
  }

  let usere = users?.filter(e => e.email === shop[0]?.userEmail);

  return (
    <div className={styles.shopDetails}>
      <AdminNav/>
      <AdminNav2 />
      {shop.length ? shop.map(el => {
        return(
          <div key={el.id} className={styles.shopDetailCardContainer}>
            <div className={styles.shopDetailCard}>
              <h1 style={{textAlign:'center', fontSize:'1.8rem'}}>Shop Detail</h1>
              <TextField
                style={{width:'40ch', margin:'5px 0', background:'#0080006e'}}
                disabled
                id="filled-disabled"
                label="SHOP ID"
                defaultValue={el.id}
                variant="filled"
                
              />
              <TextField
                style={{width:'40ch', margin:'5px 0' , background:'#0080006e'}}
                disabled
                id="filled-disabled"
                label="Date"
                defaultValue={el.date}
                variant="filled"
                
              />
              <TextField
                style={{width:'40ch', margin:'5px 0' , background:'#0080006e'}}
                disabled
                id="filled-disabled"
                label="Email"
                defaultValue={el.extraEmail ? el.extraEmail : el?.userEmail}
                variant="filled"
              />
              <TextField
                style={{width:'40ch', margin:'5px 0' , background:'#0080006e'}}
                disabled
                id="filled-disabled"
                label="Amount"
                defaultValue={`$ ${el.total_paid_amount.toLocaleString('en-US')}`}
                variant="filled"
              />
              {el.products.map(el => {
                return(
                  <div key={el}>
                <Link to={'/admin/product/' + el}>
                  <TextField
                    style={{width:'40ch', margin:'5px 0' , background:'#0080006e'}}
                    disabled
                    id="filled-disabled"
                    label="Product"
                    defaultValue={el}
                    variant="filled"
                    multiline
                  />
                </Link>
                  </div>
                )
        })} 
              <TextField
                style={{width:'40ch', margin:'5px 0' , background:'#0080006e'}}
                disabled
                id="filled-disabled"
                label="Payment status"
                defaultValue={el.status}
                variant="filled"
              />
              <TextField
                style={{width:'40ch', margin:'5px 0', background:'#0080006e' }}
                disabled
                id="filled-disabled"
                label="Address"
                defaultValue={el.extraAddress ? el.extraAddress : usere[0].address}
                variant="filled"
              />
              <TextField
                style={{width:'40ch', margin:'5px 0' , background:'#0080006e'}}
                disabled
                id="filled-disabled"
                label="Shop State"
                value={state}
                variant="filled"
              />
              <div style={{margin: 'auto'}}>
                <TextField
                  sx={{
                    '& > :not(style)': { m: 1, display: 'flex', width: '20ch', color:'white', color:'green' },
                  }}
                  variant="filled"
                  id="filled-select-currency"
                  select
                  label="Shop State"
                  value={update}
                  onChange={(e) => handleUpdateState(e)}
                > 
                  <MenuItem value='In process'>In process</MenuItem>
                  <MenuItem value='Paid'>Paid</MenuItem>
                  <MenuItem value='On its way'>On its way</MenuItem>
                  <MenuItem value='Cancelled'>Cancelled</MenuItem>
                  <MenuItem value='Received'>Received</MenuItem>
                </TextField>
              </div>
              <Button variant="outlined" onClick={(e) => handleClick(e)} style={{width:'20ch', margin: '5px auto 20px auto'}} >SAVE</Button>
            </div>
          </div>
        )
      })
      : <NotFound404/>
      }
    </div>
  )
}

export default ShopDetail