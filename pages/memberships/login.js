import React, {useState} from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import Link from 'next/link'

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const [roll, setRoll] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [message, setMessage] = useState("");
  // setError("");
  // setMessage("");

  // fields check
  // if (!roll || !password )
  //   return setError("All fields are required");
  function handleSubmit(e) {
    e.preventDefault();
    //call api
    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roll,
        password,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        if (data && data.error) {
          setLoginError(data.message);
          // return setError(data.message);
        }
        if (data && data.token) {
          //set cookie
          cookie.set('token', data.token, {expires: 2});
          Router.push('/memberships');
        }
      });
  }
  return (
    <div className="body">
    <div className="main">
    <form onSubmit={handleSubmit}>
      <p className='sign'>Login</p>
      <input
      className='input'
      placeholder='Roll no'
        name="roll"
        type="text"
        value={roll}
        onChange={(e) => setRoll(e.target.value)}
      />
      <input
      className='input'
      placeholder='Password'
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" value="Submit" className="button a">login</button>
      {loginError && <p style={{color: 'red'}}>{loginError}</p>}
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
          <Link className="a" href="#">Forgot Password?</Link>
        </p>
    </div>
    </div>
  );
};

export default Login;