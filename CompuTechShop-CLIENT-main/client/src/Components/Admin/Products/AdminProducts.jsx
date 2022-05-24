import React from 'react'
import AdminNav from '../AdminNav/AdminNav'
import styles from './AdminProducts.module.css'
import AllProductsAdmin from './Categories/AllProducts/AllProductsAdmin'
import AdminNav2 from '../AdminNav/AdminNav2'

function AdminProducts() {
  return (
    <div className={styles.adminProducts}>
        <AdminNav />
        <AdminNav2 />
        <AllProductsAdmin/>
    </div>
  )
}


export default AdminProducts