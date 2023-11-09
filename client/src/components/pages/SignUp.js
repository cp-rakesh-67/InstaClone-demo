import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";
const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const PostData = () => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      M.toast({ html:'Email is Invalid', classes: "#d32f2f red darken-2" });
      return;
    }
    if(password.length<6){
      M.toast({ html:'password is too short', classes: "#d32f2f red darken-2" });
      return;
    }

    
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    };
    fetch("/api/v1/user/auth/register", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          M.toast({ html: data.message, classes: "#43a047 green darken-1" });
          navigate("/signin");
        } else {
          M.toast({ html: data.message, classes: "#d32f2f red darken-2" });
        }
      });
  };
  return (
    <div className="RakeshCard">
      <div className="card auth-card">
        <h1 className="margin2">SIGN UP</h1>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button className="btn waves-effect waves-light" onClick={PostData}>
          SignUp
        </button>
        <h5 className="margin1">
          <Link to="/signin">Already have an account</Link>
        </h5>
      </div>
    </div>
  );
};

export default SignUp;
