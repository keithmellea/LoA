import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from 'react-router-dom';
import { signUp, login } from '../../store/session';

import '../auth/SignUpForm.css';

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, email, password));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/game" />;
  }

const demoLogin = async (e) => {
  const email = "demo@aa.io";
  const password = "password";
  e.preventDefault();
  const data = await dispatch(login(email, password));
};

  return (
    <div id="signup-container">
      <form className="signupform" onSubmit={onSignUp}>
        <div id="signup-contents">
          <div id="title-label">Sign Up</div>
          <div id="username">
            <label className="signup-labels">User Name</label>
            <input
              style={{ color: "black" }}
              type="text"
              className="signup-inputs"
              name="username"
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div id="email">
            <label className="signup-labels">Email</label>
            <input
              id="password-input"
              className="signup-inputs"
              style={{ color: "black" }}
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div id="password">
            <label className="signup-labels">Password</label>
            <input
              id="password-input"
              className="signup-inputs"
              style={{ color: "black" }}
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div id="repeat-password">
            <label className="signup-labels">Repeat Password</label>
            <input
              id="repeat-password-input"
              className="signup-inputs"
              style={{ color: "black" }}
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button id="signup-button" style={{ color: "black" }} type="submit">
            Sign Up
          </button>
          <button
            id="demo-button"
            style={{ color: "black" }}
            type="submit"
            onClick={demoLogin}
          >
            Demo Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
