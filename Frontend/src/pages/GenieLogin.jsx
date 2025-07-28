import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { GenieDataContext } from "../context/GenieContext";
import { useContext } from "react";
import axios from "axios";

const GenieLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { genie, setGenie } = useContext(GenieDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const genieData = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/genies/login`,
      genieData
    );

    if (response.status === 200) {
      const data = response.data;
      setGenie(data.genie);
      localStorage.setItem("token", data.token);
      navigate("/genie/home");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <h1 className="text-[30px] text-blue-300 font-medium mb-[20px]">
          Genie
        </h1>

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">Enter email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter password</h3>

          <input
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            type="password"
            placeholder="password"
          />

          <button className="bg-blue-500 text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-center">
          New here?{" "}
          <Link to="/genie/register" className="text-blue-600">
            Create an account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/user/login"
          className="bg-[#878787] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Continue as User
        </Link>
      </div>
    </div>
  );
};

export default GenieLogin;
