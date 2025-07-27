import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import GenieLogin from "./pages/GenieLogin";
import GenieRegister from "./pages/GenieRegister";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/genie-login" element={<GenieLogin />} />
        <Route path="/genie-register" element={<GenieRegister />} />
      </Routes>
    </div>
  );
};

export default App;
