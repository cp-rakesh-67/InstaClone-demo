import Navbar from "./components/Navbar";
import './App.css';
import { Route,Routes, useNavigate} from 'react-router-dom' 
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Profile from "./components/pages/Profile";
import CreatePost from "./components/pages/CreatePost";
import Logout from "./components/pages/Logout";
import { useContext } from "react";
import { AppContex } from "./context/AppContex";
import UserProfile from "./components/pages/UserProfile";


function App() {
    const {user}=useContext(AppContex);
    const navigate=useNavigate();
  return (
    
    <div>
    <Navbar></Navbar>
    <Routes>
      <Route path="/" element={user?<Home></Home>:
      <div style={{margin:'16rem 30rem' }}>
      <h1 style={{fontSize:'3rem' ,fontWeight:"bold",color:"blue"}}>opps ! Register or Login First</h1>
      <div style={{marginTop:'3rem'}} >
      <button style={{marginLeft:'15rem'}} onClick={()=>{navigate('/signin')}} className="btn waves-effect waves-light ">Login</button>
      <button style={{marginLeft:'2rem'}} onClick={()=>{navigate('/signup')}} className="btn waves-effect waves-light">Register</button>
      </div>
     
      </div>}></Route>
      {/* <Route path="/" element={<Home></Home>}></Route> */}
      <Route path="/signin" element={<Login></Login>}></Route>
      <Route path="/signup" element={<SignUp></SignUp>}></Route>
      <Route path="/profile" element={<Profile></Profile>}></Route>
      <Route path="/create" element={<CreatePost></CreatePost>}></Route>
      <Route path="/logout" element={<Logout></Logout>}></Route>
      <Route path="/userProfile/:id" element={<UserProfile></UserProfile>}></Route>
    </Routes>
    </div>
    
  );
}

export default App;
