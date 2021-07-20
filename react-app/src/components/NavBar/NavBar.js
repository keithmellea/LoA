import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector, useDispatch } from "react-redux";

import "../NavBar/NavBar.css"

const NavBar = () => {
  const user = useSelector((state) => state.session.user);

if (user) {
  return (
    <nav id="navbar">
      <ul id="navbar-ul">
        <li className="navbar-li" id="logout-button">
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}
  else
  return (
    <nav id="navbar">
      <ul id="navbar-ul">
        <li className="navbar-li">
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li className="navbar-li">
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
