import React from "react";
import styles from "../styles/Membership.module.css";
function Membership() {
  return (
    <div className={styles.body}>
      <div className={styles.main}>
        <p className={styles.sign} align="center">
          Sign in
        </p>
        <form className={styles.form1}>
          <input
            className={styles.un}
            type="text"
            align="center"
            placeholder="Username"
          />
          <input
            className={styles.pass}
            type="password"
            align="center"
            placeholder="Password"
          />
          <a className={styles.submit+" "+styles.a} align="center">
            Sign in
          </a>
        </form>
        <p className={styles.forgot} align="center">
          <a className={styles.a} href="#">Forgot Password?</a>
        </p>
      </div>
    </div>
  );
}

export default Membership;
