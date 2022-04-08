import React, { useState } from "react";
import { useRouter } from 'next/router';

 function Signup()  {
  const router = useRouter();
  const [signupError, setSignupError] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch('../api/auth', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
      
      let data = await res.json();
      // Throw error with status code in case Fetch API req failed
      // if (!res.ok) {
      //   throw new Error(res.status)
      // }
      setMessage(data.msg);
      console.log("signin")
      // router.push('/')
    } catch (error) {
      console.log(error)
      // return setError(data.msg);
    //  return error;
    }
  }





  return (
    <div className="body">
      <form onSubmit={handleSubmit}>
        <p>Sign Up</p>
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
          className="input"
          placeholder="Enter your Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          type="text"
        />
        <input
          className="input" 
          placeholder="Enter your Email..." 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="text"
        />

        <br />
        <input
          className="input"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
        />

        <br />

        <input className="button" type="submit" value="Submit" />
        {signupError && <p style={{ color: "red" }}>{signupError}</p>}
      </form>
    </div>
  );
};

export default Signup;
