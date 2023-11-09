import { createContext, useEffect, useState } from "react";

export const AppContex=createContext();

export default function AppContexProvider({children}){
    const [user,setUser]=useState(null);
    const [logged_user,setLogged_user]=useState(null);

    
    const getdata=async()=>{
        const data=await fetch('/api/v1/userP/loggedUser',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        });
        const res=await data.json();
        setLogged_user(res);
    
    }
    
    useEffect(()=>{
        const token=localStorage.getItem('jwt');
        setUser(token);
        if(!token){
            setLogged_user(null);
        }else{
            getdata(); 
        }
          
    },[])
   
    const value ={
       user,
       setUser,
       logged_user,
       setLogged_user,
       getdata,
    };
    return <AppContex.Provider value={value}>
        {children}
    </AppContex.Provider>

}