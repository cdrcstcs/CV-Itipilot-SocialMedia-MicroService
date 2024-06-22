import { createContext, useContext, useState, useEffect } from "react";
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
    const [userDataFetch, setUserDataFetch] = useState(null); // Use null to distinguish between initial load and no data
    const token = getCookie('usertoken');
    console.log(token);
    useEffect(() => {
        const getUserData = async () => {
            try {
                const userId = await axios.post('http://localhost:3000/verify', token);
                const response = await axios.get(`http://localhost:3000/users/${userId.data}`);
                setUserDataFetch(response.data);
            } catch (error) {
                console.log("Error fetching user data:", error);
                setUserDataFetch(null); // Reset state or handle appropriately
            }
        };
        if (token) {
            getUserData();
        } else {
            setUserDataFetch(null); // Reset state or handle appropriately
        }
    }, [token, userDataFetch]); // Only run this effect when token changes
    return (
        <AuthContext.Provider value={{ userDataFetch }}>
            {children}
        </AuthContext.Provider>
    );
};
