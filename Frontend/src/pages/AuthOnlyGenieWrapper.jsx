import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GenieDataContext } from "../context/GenieContext";
import { useContext } from "react";
import axios from "axios";
import { useState } from "react";

const AuthOnlyGenieWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { genie, setGenie } = useContext(GenieDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/genie/login");
    }
  }, [token]);

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/genies/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setGenie(response.data.genie);
      }
    })
    .catch(() => {
      localStorage.removeItem("token");
      navigate("/genie/login");
    })
    .finally(() => {
      setIsLoading(false);
    });

  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default AuthOnlyGenieWrapper;
