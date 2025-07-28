import React from "react";
import { createContext } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = React.useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
  });
  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
