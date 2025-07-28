import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import GenieRegister from "./pages/GenieRegister";
import Start2 from "./pages/Start2";
import GenieLogin from "./pages/GenieLogin";
import Home from "./pages/Home";
import AuthOnlyUserWrapper from "./pages/AuthOnlyUserWrapper";
import UserLogout from "./pages/UserLogout";
import GenieHome from "./pages/GenieHome";
import AuthOnlyGenieWrapper from "./pages/AuthOnlyGenieWrapper";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/onboarding/1" element={<Start />} />
        <Route path="/onboarding/2" element={<Start2 />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/genie/login" element={<GenieLogin />} />
        <Route path="/genie/register" element={<GenieRegister />} />
        <Route
          path="user/home"
          element={
            <AuthOnlyUserWrapper>
              <Home />
            </AuthOnlyUserWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <AuthOnlyUserWrapper>
              <UserLogout />
            </AuthOnlyUserWrapper>
          }
        />
        <Route
          path="/genie/home"
          element={
            <AuthOnlyGenieWrapper>
              <GenieHome />
            </AuthOnlyGenieWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
