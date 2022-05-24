import NavBar from '../../../NavBar/Navbar'
import React, { useState, useEffect} from 'react'
import { getDetail, getReview, getShopById, getUser, postReview, updateProduct, updateShop } from '../../../../Redux/Actions'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NotFound404 from '../../../NotFound404/NotFound404';
import { TextField, Button } from '@mui/material/';
import styles from './MyOrderDetail.module.css'
import Rating from '@mui/material/Rating';
import { useAuth0 } from "@auth0/auth0-react";
import anonymous from '../../../../Images/anonymous.png'
import Swal from 'sweetalert2'
import { CircularProgress } from "@mui/material";
import Footer from '../../../Footer/Footer';


function MyOrderDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams();
    const shop = useSelector ((state) => state.shopDetail);
    const { user } = useAuth0();
    const userss = useSelector((state) => state.users)
    const userAuth0Email = user?.email
    const userId = userss?.find(user => user.email === userAuth0Email)
    const Swal = require('sweetalert2')

    useEffect(() => {
      dispatch(getShopById(id));
    }, [dispatch]);

    const product = useSelector((state) => state.productDetail);

    let users = useSelector((state) => state.users);
    let state;
    let usere;
    if(shop.length) {
      usere = users.filter(u => u.id === shop[0].userId)
      state = shop[0].state
    }

    const [input, setInput] = useState({
        name: product[0]?.name,
        image: product[0]?.image,
        price: product[0]?.price, 
        quantity: product[0]?.quantity,
        categories: product[0]?.category,
        brand: product[0]?.brand,
        description: product?.description,
        calification: 0,
    })

    const [newInput, setNewInput] = useState({
      calification: 0,
      comment: '',
    })

    function handleChange(e){
      dispatch(getDetail((shop[0]?.name).replace(/ /g, '%20')))
      dispatch(getReview(product[0].name))
      e.preventDefault()
      setInput({
        ...input,
        name: product[0].name,
        price: product[0].price, 
        quantity: product[0].quantity,
        brand: product[0].brand,
        image: product[0].image,
        description: product[0].description,
        categories: product[0].category,
      })
      setNewInput({
        ...newInput,
        [e.target.name] : e.target.value
      })
    }

    const reviews = useSelector((state) => state.review)

    function newCalification(myCalification) {
      let result = 0;
      let calificationsN = reviews.length + 1
      reviews.map(e => result += Number(e.calification))
      return (result + Number(myCalification)) / calificationsN
    }

    function handleClick(e){
      e.preventDefault()
      newCalification(newCalification(newInput.calification))
      dispatch(updateProduct(product[0].id, {calification: newCalification(newInput?.calification)}))
      dispatch(postReview({comment: newInput.comment, userId: userId.id, productId: product[0].id, calification: newInput.calification}))
      dispatch(updateShop(id, {state: 'Received'}))
      Swal.fire({
        title: 'Order updated!',
        icon: 'success',
        confirmButtonText: 'OK',
      })
      dispatch(getShopById(id))
      navigate('/profile/myorders')
    }

    const [load, setLoad] = useState(true)

    setTimeout(function () {
      setLoad(false)
    }, 1000)

  return (
    <div className={styles.shopDetails}>
      <NavBar />
      {load ?
        <CircularProgress color="inherit" style={{ position: 'absolute', top: '50%', left: '50%' }} />
        :
        shop.length ? shop.map(el => {
        return(
          <div key={el.id} className={styles.shopDetailCardContainer}>
            <div className={styles.shopDetailCard}>
              <h1 style={{textAlign:'center', fontSize:'1.8rem'}}>Order Detail</h1>
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
                defaultValue={el.date.slice(0, 40)}
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
                defaultValue={`$${el.total_paid_amount.toLocaleString('en-US')}`}
                variant="filled"
              />
              {el.products.map(el => {
                return(
                  <div key={el}>
                <Link to={'/' + el}>
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
                style={{width:'40ch', margin:'5px 0', background:'#0080006e' }}
                disabled
                id="filled-disabled"
                label="Quantity"
                defaultValue={shop[0].quantity}
                variant="filled"
              />
              <TextField
                style={{width:'40ch', margin:'5px 0', background:'#0080006e' }}
                disabled
                id="filled-disabled"
                label="Address"
                defaultValue={el.extraAddress ? el.extraAddress : userId.address}
                variant="filled"
              />

              <TextField
              style={{width:'40ch', margin:'5px 0' , background:'#0080006e'}}
                disabled
                id="filled-disabled"
                label="Payment status"
                defaultValue={el.status}
                variant="filled"
              />

              <TextField
              style={{width:'40ch', margin:'5px 0' , background:'#0080006e'}}
                disabled
                id="filled-disabled"
                label="Order status"
                defaultValue={el.state}
                variant="filled"
              />

        
        { shop[0]?.state !== 'Received' ?     
            <div>

          <div style={{display: 'flex', alignContent:'center', alignItems:'center', margin:'5px 0'}}>
            <h4 style={{margin: 'auto'}}>Rate this product:</h4>
            <Rating
                style={{margin:'auto'}}
                name="calification"
                value={newInput.calification}
                onChange={(e) => handleChange(e)}
            />
            </div>
              <div style={{alignContent:'center', alignItems:'center', margin:'5px 0'}}>
            <TextField
                style={{margin:'auto', display:'flex'}}
              variant="filled"
              required
              id="outlined-multiline-static"
              name="comment"
              onChange={handleChange}
              label="Calificate this product"
              multiline
              rows={3}
              value={input.comment}
            />
            </div>
              <Button variant="outlined" onClick={(e) => handleClick(e)} style={{width:'40ch', margin: '15px auto 30px auto', display:'flex'}}
                disabled={!newInput.calification  || !newInput.comment ? true : false} >Product Received</Button>

              </div>
          : <div style={{display: 'flex', alignContent:'center', alignItems:'center', margin:'5px 0'}}>
              <Button variant="outlined" onClick={(e) => handleClick(e)} style={{width:'40ch', margin: '15px auto 30px auto', display: 'flex'}}
                disabled>Thank you for shopping!</Button>
          </div>
        }
            </div>
          </div>
        )
      })
      : <NotFound404/>
      }
        <Footer />
    </div>
  )
}

export default MyOrderDetail