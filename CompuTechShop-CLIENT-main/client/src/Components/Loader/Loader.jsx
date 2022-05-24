import React from 'react'
import loader from '../../Images/loader.gif'
import styles from './Loader.module.css'

function Loader() {
  return (
    <div>
        <img src={loader} alt="loader" className={styles.loaderGif} />
    </div>
  )
}

export default Loader