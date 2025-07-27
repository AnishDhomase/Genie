import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import GenieRegister from "./pages/GenieRegister";
import Start2 from "./pages/Start2";
import GenieLogin from "./pages/GenieLogin";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/user-roles" element={<Start2 />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/genie-login" element={<GenieLogin />} />
        <Route path="/genie-register" element={<GenieRegister />} />
      </Routes>
    </div>
  );
};

export default App;
