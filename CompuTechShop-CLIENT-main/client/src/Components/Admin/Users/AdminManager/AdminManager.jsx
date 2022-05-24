import React from 'react'
import AdminNav from '../../AdminNav/AdminNav'
import AdminNav2 from '../../AdminNav/AdminNav2'
import AdminCreate from './AdminCreate/AdminCreate'
import styles from './AdminManager.module.css'
import UserAdmins from './UserAdmins/UserAdmins'

function AdminManager() {


  return (
    <div className={styles.adminManager}>
        <AdminNav />
        <AdminNav2/>
        <div className={styles.adminCreateContainer}>
            <AdminCreate />
        </div>
            <UserAdmins />
    </div>
  )
}

export default AdminManager