import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();
export const useAuthContext = () => {
  return useContext(AuthContext);
};
function getCookie(name) {
  const cookieRegex = new RegExp(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
  const cookieMatch = document.cookie.match(cookieRegex);
  return cookieMatch ? decodeURIComponent(cookieMatch[2]) : null;
}
export const AuthContextProvider = ({ children }) => {
  const [userDataFetch, setUserDataFetch] = useState(null);
  const [previousUserData, setPreviousUserData] = useState(null);
  const token = getCookie('usertoken');
  useEffect(() => {
    const getUserData = async () => {
      try {
        if (!token) {
          setUserDataFetch(null);
          return;
        }
        const verifyResponse = await axios.post('http://localhost:3000/verify', { token });
        const { userId } = verifyResponse.data;
        const userResponse = await axios.get(`http://localhost:3000/users/${userId}`);
        const currentUserData = userResponse.data;
        if (!previousUserData || JSON.stringify(currentUserData) !== JSON.stringify(previousUserData)) {
          setUserDataFetch(currentUserData);
          setPreviousUserData(currentUserData);
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
        setUserDataFetch(null); // Reset state or handle appropriately
      }
    };
    getUserData(); // Call getUserData immediately when token changes or on component mount
  }, [token, previousUserData]); // Depend on token and previousUserData changes
  return (
    <AuthContext.Provider value={{ userDataFetch }}>
      {children}
    </AuthContext.Provider>
  );
};
