import React, { useContext, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContex } from '../context/AppContex'
import M from "materialize-css";

const Navbar = () => {
  const searchModel=useRef(null);
  let {user,logged_user}=useContext(AppContex);
  const navigate=useNavigate();
  const[searchUser,setSearchUser]=useState('');
  const[consoleUser,setconsoleUser]=useState([]);


  


   const OpenModel=()=>{
    var instance = M.Modal.init(searchModel.current);
    instance.open();
   }
   const SearchIng=(value)=>{
        setSearchUser(value);
        fetch('/api/v1/userP/serch-user',{
          method:'POST',
          headers:{
            "Content-Type":"application/json",
             "authorization":"Bearer "+localStorage.getItem('jwt')
          },
          body:JSON.stringify({
            query:value,
          })
        }).then(res=>res.json()).then(data=>setconsoleUser(data.user));
        console.log(consoleUser);
   }





  return (
    
    <nav>
    <div className="nav-wrapper white">
      <NavLink to="/" className="brand-logo">InstaSocial</NavLink>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
      {
        (user!=null)?(
          <div>
           <li><NavLink to="/">
           <i onClick={OpenModel} className="large material-icons" style={{color:'black', marginRight:'15px', marginTop:'3px',cursor:'pointer'}}>search</i>
           </NavLink></li>  
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/profile">Profile</NavLink></li>
           <li><NavLink to="/create">Create-Post</NavLink></li>
           <li><NavLink to="/logout">Logout</NavLink></li>
          </div>
        ):(<div>
          <li><NavLink to="/signin">Login</NavLink></li>
          <li><NavLink to="/signup">Sign Up</NavLink></li>
        </div>)
      }
        
        
      </ul>
    </div>



  {/* Serach Model */}
  <div
            id="modal12"
            className="modal"
            ref={searchModel}
            style={{ height: "auto", width: "30%"}}
          >
            <div className="modal-content">
              <h4 style={{ fontSize: "xx-large", fontWeight: "bolder" ,  color:'black'}}>           
              Search People
              </h4>
              <div className="row">
               <div className="input-field col s6">
                <input onChange={(e)=>SearchIng(e.target.value)} id="input_text" type="text" data-length="50"  placeholder='tap here for search' style={{color:'blue'}}/>
               </div>
               </div>
               <div className="collection">
               {consoleUser.map((items)=>(
                <p onClick={()=>navigate(`/userProfile/${items._id}`)} style={{ color:'green' ,cursor:'pointer'}}>           
               {items.name}
              </p>
               ))}</div>
            </div>

            <div className="modal-footer">
              <button onClick={()=>{navigate('/')}} className="modal-close waves-effect waves-green btn-flat" style={{cursor:'pointer'}}>
                Close
              </button>
            </div>
          </div>

  </nav>

        
  )
}

export default Navbar