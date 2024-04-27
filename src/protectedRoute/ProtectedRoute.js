// SignIn.js

import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Navigate, useLocation, useNavigate } from "react-router-dom"; 
import { firebaseConfig } from "../configurations/firebaseConfig";

const ProtectedRoute = ({children}) => {

  const location = useLocation();
  const userEmail = localStorage.getItem('user');
    let isAuthenticated = userEmail?true:false;
    // if (userEmail) {
    //   // If data exists, parse and set it in state
      
    // }

      console.log(isAuthenticated,' isAuthenticated')

  if (!isAuthenticated){
    return <Navigate to={"/signin"}></Navigate>
  }
  else if(isAuthenticated && location.pathname.includes('sign')){
    console.log(location,'seepathhh')
    return <Navigate to={"/home"}></Navigate>
  }

  return children;
};

export default ProtectedRoute;
