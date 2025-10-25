import { useContext,createContext, useEffect, useState } from "react";
import Authenticator from "../utils/Authenticator";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [isAuth,setIsAuth] = useState(false);
    const [user,setUser] = useState(null);
    const [userBalance,setUserBalance] = useState(null);

    useEffect(()=>{
    const checkAuth = async () => {
        const {flag,userId,balance} = Authenticator();
        if(flag){
            setIsAuth(flag);
            setUser(userId);
            setUserBalance(balance);
        }
    };
    
        checkAuth();
    },[]);

    return (
    <AuthContext.Provider value={{isAuth, setIsAuth,user,setUser, userBalance,setUserBalance}}>
        {children}
    </AuthContext.Provider>
    );

};

export const useAuth=()=>useContext(AuthContext);
