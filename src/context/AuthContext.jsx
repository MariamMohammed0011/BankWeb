import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  const login = (tokenValue, roleValue) => {
   
    document.cookie = `token=${tokenValue}; max-age=3600; path=/; Secure; SameSite=Lax`;

    setRole(roleValue);
  };

  const logout = () => {
    document.cookie = "token=; max-age=0; path=/;";
    setRole(null);
  };

  const getToken = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  };

  return (
    <AuthContext.Provider value={{ role, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
