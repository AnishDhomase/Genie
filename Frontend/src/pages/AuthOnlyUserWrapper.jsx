import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";

const AuthOnlyUserWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/user/login");
    }
  }, [token]);

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setUser(response.data.genie);
      }
    })
    .catch(() => {
      localStorage.removeItem("token");
      navigate("/user/login");
    })
    .finally(() => {
      setIsLoading(false);
    });

  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default AuthOnlyUserWrapper;
