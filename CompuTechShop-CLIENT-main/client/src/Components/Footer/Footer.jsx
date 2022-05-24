import React from 'react'
import styles from './Footer.module.css'
import {Link} from 'react-router-dom'
import FAQ from './FAQ'
import FAQ2 from './FAQ2'
import WorkWithUs from './WorkWithUs'
import About from './About'
import Help from './Help'
function Footer() {
 

  
  
  
  return (
    <div className={styles.footerSuperContainer}>
    <div className={styles.footerContainer}>
      
        <div className={styles.footer}>
          <div className={styles.copyrightFooter}>
            <p> Copyright © 2022 CompuTechStore S.R.L.</p>
            <p>Av. Siempre Viva 123, Piso 5, CP 1234, Argentina</p>
          </div>
          <div>
            {/* <li onClick={() => <FAQ2/>}>
                <button>FAQ2</button>
            </li> */}
          </div>
          <div className={styles.extrasFooter}>
           <Link to='/FAQ'>
            <p>FAQ's</p>
            </Link>
          <Link to='/Help'>
            <p>Help</p>
            </Link>
            <Link to='/WorkWithUs'> 
            <p>Work with us</p>
            </Link>
            <Link to='/About'>
            <p>About</p>
            </Link>
          </div>
          <div className={styles.socialMedia}>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <img src="https://img.icons8.com/nolan/64/instagram-new.png" alt="socialLogo"/>
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
              <img src="https://img.icons8.com/nolan/64/facebook-new.png" alt="socialLogo"/> 
            </a>
          </div>
        </div>
    </div>
    </div>
  )
}

export default Footer