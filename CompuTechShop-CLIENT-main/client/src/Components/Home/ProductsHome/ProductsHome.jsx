import React from 'react'
import { useSelector } from 'react-redux'
import styles from './ProductsHome.module.css'

function ProductsHome() {
    const products = useSelector((state) => state.allProducts)
    const start = Math.floor(Math.random() * products.length)
    const randomProducts = products.slice(start, start + 5)

  return (
    <div className={styles.productsHomeContainer}>
        {
            randomProducts?.length > 0 ?
                randomProducts?.map(e => {
                    return (
                        <h1>{e.name}</h1>
                    )
                })
            : null
        }
    </div>
  )
}

export default ProductsHome