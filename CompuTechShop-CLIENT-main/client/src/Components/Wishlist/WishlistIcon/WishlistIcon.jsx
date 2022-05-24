import React from 'react'
import styles from './WishlistIcon.module.css'
import emptyFavorite from '../../../Images/emptyFavorite.png'
import filledFavorite from '../../../Images/filledFavorite.png'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postWishlist, getWishlist, deleteWishlist } from '../../../Redux/Actions'
import { useAuth0 } from "@auth0/auth0-react";
import { useSnackbar } from 'notistack';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

function Wishlist({ id, name }) {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const userss = useSelector((state) => state.users)
  const userAuth0Email = user?.email
  const userId = userss?.find(user => user.email === userAuth0Email)
  const myWishlist = useSelector((state) => state.wishlist);
  let whatIs;
  myWishlist?.map(e => e.product[0] === name ? whatIs = true : false)
  const [favorite, setFavorite] = useState(whatIs)
  const Swal = require('sweetalert2')

  const wishlist = {
    userId: userId?.id,
    products: name
  }

  const { enqueueSnackbar } = useSnackbar();

  const removedAlert = (variant) => () => {
    // variant could be success, error, warning, info, or default
    if (userId) {
      enqueueSnackbar('Removed from favorites!', { variant });
    }
  };
  const addedAlert = (variant) => () => {
    if (userId) {
      enqueueSnackbar('Added to favorites!', { variant });
    }
  };

  function handleFavorite() {
    if (!userId) {
      Swal.fire({
        title: 'You must be logged to add products to favorites!',
        icon: 'info',
        confirmButtonText: 'OK',
      })
    }
    if (!favorite) {
      dispatch(postWishlist(wishlist))
      setFavorite(!favorite)
      setTimeout(() => {
        dispatch(getWishlist(userId.id))
      }, "250")
    }
  }

  function handleFavoriteDelete() {
    // console.log('wishlist delete: ', wishlist)
    const wishlistId = myWishlist?.filter(e => e.product[0] === name)[0].id
    if (whatIs === true) {
      dispatch(deleteWishlist(wishlistId))
      setFavorite(false)
      setTimeout(() => {
        dispatch(getWishlist(userId.id))
      }, "250")
    }
  }

  return (
    <div className={styles.wishIcon}>
      {whatIs ?
        // <button className={styles.filledFavorite} onClick={handleFavoriteDelete}><img src={filledFavorite} alt="" /></button>
        <button className={styles.filledFavorite} onClick={() => handleFavoriteDelete()}><img onClick={removedAlert('error')} src={filledFavorite} alt="" /></button>
        :
        // <button className={styles.emptyFavorite} onClick={handleFavorite}><img src={emptyFavorite} alt="" /></button>
        <button className={styles.emptyFavorite} onClick={() => handleFavorite()}><img onClick={addedAlert('success')} src={emptyFavorite} alt="" /></button>
      }
    </div>
  )
}

export default Wishlist

