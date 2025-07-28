import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthOnlyUserWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/user/login");
    }
  }, [token]);

  return <>{children}</>;
};

export default AuthOnlyUserWrapper;
