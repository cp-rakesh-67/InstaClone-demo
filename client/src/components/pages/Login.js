import React, { useContext, useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import M from 'materialize-css'
import { AppContex } from '../../context/AppContex';


const Login = () => {
  const navigate=useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassWord]=useState('');
  const {setUser}=useContext(AppContex);
  const logindata=()=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
  };
  fetch('/api/v1/user/auth/login', requestOptions)
      .then(response => response.json()).then(data=> { 
        if(data.success){
        localStorage.setItem('jwt',data.token);
        localStorage.setItem('user',JSON.stringify(data.user));
        M.toast({html: data.message,classes:'#43a047 green darken-1'})
        setUser(localStorage.getItem('jwt'));
        navigate('/');
      }
        else{
          M.toast({html: data.message,classes:'#d32f2f red darken-2'})
        }
      });
  }
  return (
    <div  className='RakeshCard'>
      <div className="card auth-card">
        <h2 className='margin2'>LOG IN</h2>
        <input type='text' placeholder='email' value={email} onChange={e=>setEmail(e.target.value)}></input>
        <input type='text' placeholder='password' value={password} onChange={e=>setPassWord(e.target.value)}></input>
        <button className="btn waves-effect waves-light" onClick={logindata}>Login</button>
        <h5 className='margin1'>
        <Link to='/signup'>Don't have an account ?</Link>
        </h5>
      </div>
    </div>
            
  )
}

export default Login;