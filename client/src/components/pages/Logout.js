import React, { useContext } from 'react'
import { AppContex } from '../../context/AppContex'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const {setUser}=useContext(AppContex);
    const navigate=useNavigate();
  return (
    <div style={{display:'flex',justifyContent:'center', alignItems:'center',marginTop:'300px'}}>
    <button className="btn waves-effect waves-light" onClick={()=>{setUser(null);localStorage.clear();navigate('/signin')}}>LogOut</button>
    </div>
  )
}

export default Logout;