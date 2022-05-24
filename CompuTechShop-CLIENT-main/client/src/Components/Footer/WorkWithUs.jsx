import React from 'react'
import styles from './WorkWithUs.module.css'
import {Link} from 'react-router-dom'
import { Button } from "@mui/material";

export default function WorkWithUs() {
  return (
    <div className={styles.workWithUs}>
      <div className={styles.caja}> 
        <h1 className={styles.text}>Become part of the dream team!</h1>
        <h2>
          If you are interested in working at Compu Tech Shop, please attach your resume or cv, and a video telling us why we should hire you to computechshop@computechshop.com
        </h2>
        <Link to='/'>
          <Button variant='contained' style={{color: 'white', backgroundColor:'blue', marginTop:'10px'}}>Back Home</Button>
        </Link>
      </div>
    </div>
  )
}