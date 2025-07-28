import React from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const AuthOnlyUserWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) navigate("/login");

  return <>{children}</>;
};

export default AuthOnlyUserWrapper;
