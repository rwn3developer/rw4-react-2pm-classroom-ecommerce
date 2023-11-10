import { useState, useEffect , createContext, useContext } from "react";

const AuthContext = createContext();


const AuthProvider = ({children}) => {
    
    const [auth,setAuth] = useState("")

    useEffect(()=>{ 
        const loginUser = JSON.parse(localStorage.getItem('checkUserLogin'));
        if(loginUser){
            setAuth(loginUser)
        }
    },[])

    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

//useAuth is Custom Hook
const useAuth = () => useContext(AuthContext);
export {useAuth,AuthProvider};
