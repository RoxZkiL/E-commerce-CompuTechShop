import React from 'react'
import styles from './WishlistNav.module.css'
import filledFavorite from '../../../Images/filledFavorite.png'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getWishlist } from '../../../Redux/Actions';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

function WishlistNav() {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const userss = useSelector((state) => state.users)
  const userAuth0Email = user?.email
  const userId = userss?.find(user => user.email === userAuth0Email)
  const wishlist = useSelector((state) => state.wishlist)

  useEffect(() => {
    dispatch(getWishlist(userId?.id))
  }, [dispatch, userId])

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& 	.MuiBadge-standard': {
      right: 0,
      top: 5,
      border: `2px solid ${theme.palette.background.paper}`,
      letterSpacing: '1px',
      height: '22px',
      width: '22px',
      borderRadius: '100%',
      // border:'1px solid black'
    },
  }));

  return (
    <div className={styles.wishlistNav}>
      <div className={styles.heart}>
        <Link to='/myfavorites'>
          <StyledBadge badgeContent={Number(wishlist.length)} color="info">
            <img src={filledFavorite} alt="profileImg" />
          </StyledBadge>
        </Link>
      </div>
    </div>
  )
}

export default WishlistNav