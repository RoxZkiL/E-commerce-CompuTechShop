import React from 'react'
import styles from './ProductNotFound.module.css'
import notFound from '../../Images/emptyCart.png'

function ProductNotFound() {
  return (
    <div className={styles.productNotFound}>
      <div className={styles.productNotFoundContainer}>
        <h1>Product not found</h1>
          <img alt="not Found" src={notFound} />
        <div className={styles.productNotFoundText}>
        </div>
      </div>
    </div>
  )
}

export default ProductNotFound