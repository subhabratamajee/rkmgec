import React, { useState } from "react";
import Router from "next/router";
import cookie from "js-cookie";

const Signup = () => {
  const [signupError, setSignupError] = useState("");
  const [email, setEmail] = useState("");
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        roll,
        password,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && data.error) {
          setSignupError(data.message);
        }
        if (data && data.token) {
          //set cookie
          cookie.set("token", data.token, { expires: 2 });
          Router.push("/memberships");
        }
      });
  }
  return (
    <div className="body">
      <form onSubmit={handleSubmit}>
        <p>Sign Up</p>

        <input
          className="input"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
        />
        <input
          className="input" 
          placeholder="Enter your Roll no" 
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          name="roll"
          type="text"
        />

        <br />
        <input
          className="input"
          placeholder="Enter your password"
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
