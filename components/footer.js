import React from 'react'
import styles from '../styles/Home.module.css'

function Footer() {
  return (
    <footer>
    <div className={styles.endpart}>
      <p id={styles.endtext}>Disgned by RIC,RKMGEC @2022</p>
      <div>
        <a href="#" className={"fa fa-facebook"}></a>
        <a href="#" className="fa fa-twitter"></a>
      </div>
    </div>
  </footer>
  )
}

export default Footer