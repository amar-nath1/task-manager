// SignIn.js

import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useNavigate, Link } from "react-router-dom"; 
import { firebaseConfig } from "../configurations/firebaseConfig";
import logo from '../assets/logo.png'

const signinStyle={
  formDiv:{
  width: '50%',
  transform: 'translate(50%, 1%)',
  border: '2px solid',
  padding: '30px'
     

  }
}  

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState({isError:false,errorText:''})
const navigate = useNavigate()
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
        firebase.initializeApp(firebaseConfig)
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log(user);
      // Save user credentials to local storage
      localStorage.setItem("user", user.email);
      navigate('/home')
    } catch (error) {
      console.error(error.message);

      setError({isError:true,errorText:error.code.replace("auth/","")})

      setTimeout(() => {
        setError({isError:false,errorText:''})
      }, 3000);
    }
  };

  return (
    <div >
      <img src={logo}></img>
      <div style={signinStyle.formDiv}>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
      <div class='form-group m-3'>
        <input
        class="form-control"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div class='form-group m-3'>
        <input
        class="form-control"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        {error.isError && (<span style={{color:'red',position:'absolute',bottom:'38%',textTransform:'capitalize'}}>{error.errorText}</span>)}
        <button class="btn btn-success m-3" type="submit">Sign In</button>
      </form>
      <p>Don't Have an Account?  <a href="#">
        <Link to="/signup"> Sign Up</Link>
      </a></p>
    </div>
    </div>
  );
};





export default SignIn;
