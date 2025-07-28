import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  axios
    .post(
      `${import.meta.env.VITE_BASE_URL}/users/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      console.log("Logout successful", response);
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    })
    .catch((error) => {
      console.error("Logout failed", error);
    });

  return <div>UserLogout</div>;
};

export default UserLogout;
