import React from 'react'
import { useSelector } from 'react-redux';
import styles from "./PurchaseSummary.module.css"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const PurchaseConfirm = () => {
  const ca = useSelector(state => state.shopping)
  setTimeout(function () {
    window.location.href = ca.toString()
  }, 4000)

  return (
    <div className={styles.redirect}>
      <div className={styles.productNotFound}>
        <div className={styles.productNotFoundContainer}>
          <h1 className={styles.redirecting}>Redirecting to MercadoPago</h1>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}