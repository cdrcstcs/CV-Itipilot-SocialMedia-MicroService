import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();
export const useAuthContext = () => {
  return useContext(AuthContext);
};
export const AuthContextProvider = ({ children }) => {
  const [userDataFetch, setUserDataFetch] = useState(null);
  console.log('hello');
  const once = true;
  useEffect(()=>{
    const getUserData = async () => {
      const userResponse = await axios.get(`http://localhost:3000/users`);
      setUserDataFetch(userResponse.data);
      console.log('hello');
    }
    getUserData();
  },[once]);
  return (
    <AuthContext.Provider value={{ userDataFetch }}>
      {children}
    </AuthContext.Provider>
  );
};
