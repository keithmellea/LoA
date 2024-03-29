import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    dispatch(logout());
  };

  return <button style={{color: "black"}} onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
