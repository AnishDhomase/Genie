import { createContext, useState } from "react";

export const GenieDataContext = createContext();

const GenieContext = ({ children }) => {
  const [genie, setGenie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateGenie = (genieData) => {
    setGenie(genieData);
  };

  const value = {
    genie,
    setGenie,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateGenie,
  };

  return (
    <GenieDataContext.Provider value={value}>
      {children}
    </GenieDataContext.Provider>
  );
};

export default GenieContext;
