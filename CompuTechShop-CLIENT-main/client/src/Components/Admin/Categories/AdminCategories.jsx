import React from 'react'
import AdminNav from '../AdminNav/AdminNav'
import AdminNav2 from '../AdminNav/AdminNav2'
import styles from './AdminCategories.module.css'
import CategoryCreate from './CategoryCreate/CategoryCreate'
import ViewCategories from './ViewCategories/ViewCategories'

function AdminCategories() {
  return (
    <div className={styles.adminCategories}>
      <AdminNav/>
      <AdminNav2/>
      <div className={styles.viewAndCreateCategoryContainer}>
        <div className={styles.viewAndCreateCategory}>
          <ViewCategories/>
          <CategoryCreate/>
        </div>
      </div>
    </div>
  )
}

export default AdminCategories