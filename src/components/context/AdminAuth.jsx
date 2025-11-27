import { createContext, useState } from "react";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  // Directly check localStorage in state initialization
  const getStoredUser = () => {
    try {
      const adminInfo = localStorage.getItem("adminInfo");
      return adminInfo ? JSON.parse(adminInfo) : null;
    } catch (error) {
      localStorage.removeItem("adminInfo");
      return null;
    }
  };

  const [user, setUser] = useState(getStoredUser());

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("adminInfo");
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
