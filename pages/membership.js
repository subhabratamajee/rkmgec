import React,{useState} from 'react';
import styles from "../styles/Membership.module.css";
// import { useState } from "react/cjs/react.production.min";
function Membership() {
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [message, setMessage] = useState("");
  const handlePost = async (e) => {
    e.preventDefault();

    // reset error and message
    setError("");
    setMessage("");

    // fields check
    if (!roll || !password )
      return setError("All fields are required");

    // if (formValidate) return setError({errs});

    let bookreq = {
      roll,
      password,
      createdAt: new Date().toISOString(),
    };
    let response = await fetch("./api/members", {
      method: "POST",
      // headers: {
      //   Accept: contentType,
      //   'Content-Type': contentType,
      // },
      body: JSON.stringify(bookreq),
    });

    let data = await response.json();

    if (data.success) {
      // reset the fields
     
      setRoll("");
      setPassword("");
      

      setMessage(data.message);

      // setTimeout(() => {
      //   router.push("./availablebooks");
      // }, 100);
    } else {
      // set the error
      return setError(data.message);
    }
  };


  return (
    <div className={styles.body}>
      <div className={styles.main}>
        <p className={styles.sign} align="center">
          Sign in
        </p>
        <form onSubmit={handlePost} className={styles.form1}>

        {error ? (
              <div className={styles.formItem}>
                <h3 className={styles.error}> {error}</h3>
              </div>
            ) : null}
            {message ? (
              <div className={styles.formItem}>
                <h3 className={styles.message}>{message}</h3>
              </div>
            ) : null}

          <input
            className={styles.input}
            type="text"
            align="center"
            value={roll}
              onChange={(e) => setRoll(e.target.value)}
            placeholder="Roll No"
          />
          <input
            className={styles.input}
            type="password"
            align="center"
            value={password}
              onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <a type="submit" className={styles.submit+" "+styles.a} align="center">
            Sign in
          </a>
           {/* <button type="submit">Request Book</button> */}
        </form>
        <p className={styles.forgot} align="center">
          <a className={styles.a} href="#">Forgot Password?</a>
        </p>
      </div>
    </div>
  );
}

export default Membership;
