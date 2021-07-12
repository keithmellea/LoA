import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

import '../auth/LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/game" />;
  }

  return (
    <div>
      <form className="loginform" onSubmit={onLogin}>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div id="email">
          <label className="login-labels" htmlFor="email">Email</label>
          <input
            style={{ color: "black" }}
            name="email"
            type="text"
            className="login-inputs"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div id="password">
          <label className="login-labels" htmlFor="password">Password</label>
          <input
            id="password-input"
            style={{ color: "black" }}
            name="password" 
            className="login-inputs"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
          <button id="login-button" style={{ color: "black" }} type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
