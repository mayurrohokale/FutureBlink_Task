import AppStateContext from "../utils/appState";
import Header from "./Home/Header";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getMe } from "./api/user";



export default function Layout({children}){

    const [user,setUser] = useState(null);
    const [userStatus, setUserStatus] = useState(""); 

    const location = useLocation();
    const navigate = useNavigate();

    async function fetchProfile(){
        try{
            const data = await getMe();
            setUser(data?.user);
            setUserStatus(data?.userStatus);
            if(data?.user?.status === 'false'){
                handleLogout();
            }

        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchProfile();
        // const intervalId = setInterval(fetchProfile, 3000);
        // return () => clearInterval(intervalId);
      }, []);
    

    useEffect(()=>{
        if(user && location.pathname === '/login'){
            navigate('/');
        }
    },[user,location,navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setUserStatus('false');
        navigate('/'); 
      };

    const value = {
        user,
        setUser,
    }

    return (
        <div>
            <AppStateContext.Provider value={value}>
            <Header/>
            <div className="pt-16">{children}</div>
            </AppStateContext.Provider>
        </div>
    )
}