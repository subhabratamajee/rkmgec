import React, { useState } from "react";
import Router from "next/router";
import Cookies from "js-cookie";
import Link from "next/link";
import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
  setLogout,
} from "../../middleware/utils";
import me from '../api/me'
 const  Login = (props) =>{
  const { baseApiUrl, profile } = props;
  const [loginError, setLoginError] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [message, setMessage] = useState("");
  // setError("");
  // setMessage("");

  // fields check
  // if (!roll || !password )
  //   return setError("All fields are required");

  function handleOnClickLogout(e) {
    setLogout(e);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    //call api
    const loginApi = await fetch("../api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials:'include',
      body: JSON.stringify({
        email,
        password,
      }),
    }).catch((error) => {
      console.error("Error:", error);
    });
    // .then((r) => {
    //   return r.json();
    // })
   
    // .then((data) => {
    // if (data && data.error) {
    //   setLoginError(data.message);
    // return setError(data.message);
  // console.log(profile)
  let data = await loginApi.json();
  if (data.success && data.token) {
    //set cookie, { expires: 3600
    Cookies.set("token", data.token );  
    console.log(data.token);
    // setLoginError("successful");
    Router.push('./');
  }
   else {
    setLoginError(data.message);
  }
  // });
  }
return (
  <div className="body">
    <div className="main">
      {/* {!profile ? ( */}
        <div>
            <p className="sign">Login</p>
          <form onSubmit={handleSubmit}>
            <input
              className="input"
              placeholder="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" value="Submit" className="button a">
              login
            </button>
            {loginError && <p style={{ color: "red" }}>{loginError}</p>}
            {/* {error ? (
              <div className={styles.formItem}>
                <h3 className={styles.error}> {error}</h3>
              </div>
            ) : null}
            {message ? (
              <div className={styles.formItem}>
                <h3 className={styles.message}>{message}</h3>
              </div>
            ) : null} */}
          </form>
          <p className="forgot" align="center">
            <Link className="a" href="#">
              Forgot Password?
            </Link>
          </p>
        </div>
      {/* ) : ( */}
        {/* <a href="#" onClick={(e) => handleOnClickLogout(e)}>
          &bull; Logout
        </a> */}
      {/* ) */}
      {/* } */}
    </div>
  </div>
);
      }     
export default Login;

// export async function getServerSideProps(context) {
//   const { req } = context;
//   const { origin } = absoluteUrl(req);

//   const baseApiUrl = `${origin}/api`;

//   const { token } = getAppCookies(req);
// console.log("token is  _________"+token)
//   const profile = token ? me(token.split(" ")[1]) : "";
//   verifyToken();
//   // const profile= ""
//   return {
//     props: {
//       baseApiUrl,
//       profile,
//     },
//   };
// }