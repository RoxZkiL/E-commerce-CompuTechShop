import React from 'react'
import styles from './WorkWithUs.module.css'
import {Link} from 'react-router-dom'
import { Button } from "@mui/material";

export default function WorkWithUs() {
  return (
    <div className={styles.workWithUs}>
    <div className={styles.caja}> 
       <h1 className={styles.text}>
        If you need urgent asistance,
      </h1>
       <h1 className={styles.text}>
        please call us at: +54 9 11 22 33 44
      </h1>
        <h2 > 
        For more information please send an email to: computechshop@computechshop.com
        </h2>
        <div> 
    </div>
  
        <Link to='/'>
          <Button variant='contained' style={{color: 'white', backgroundColor:'blue', marginTop:'10px'}}>Back Home</Button>
        </Link>
    </div>
  </div>
  )
}
