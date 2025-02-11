import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axios/Axios";

export const UserContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if(token) {

                    const response = await axiosInstance.get('/auth/verify', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    
                    if(response.data.success) {
                        setUser(response.data.user)
                    }
                }else{
                    setUser(null)
                    setLoading(false)
                }
            } catch (error) {
                if(error.response && !error.response.data.error){
                    setUser(null)
                }
            }finally {
                setLoading(false)
            }
            
        }
        verifyUser();
    }, [user])

    const login = (user) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };



    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);
export default AuthProvider;
