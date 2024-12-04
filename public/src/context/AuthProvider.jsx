import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    async function fetch() {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      setLoggedInUser(user);
    }
    fetch();
  }, []);

  useEffect(() => {
    async function handleStorageChange() {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      setLoggedInUser(user);
    }
    window.addEventListener("storage", handleStorageChange);
    const originalSetItem = localStorage.setItem;
    const originalRemoveItem = localStorage.removeItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments);
      handleStorageChange();
    };
    localStorage.removeItem = function (key) {
      originalRemoveItem.apply(this, arguments);
      handleStorageChange();
    };
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      localStorage.setItem = originalSetItem;
      localStorage.removeItem = originalRemoveItem;
    };
  }, []);
  

  return (
    <AuthContext.Provider value={[loggedInUser, setLoggedInUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
