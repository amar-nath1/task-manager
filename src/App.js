// App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/Signup";
import SignIn from "./components/Signin";
import Home from "./components/Home/Home";
import './App.css';
import ProtectedRoute from "./protectedRoute/ProtectedRoute";


function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    // Check if data exists in local storage
    
  }, []);

  console.log(data,'datare')
  return (
    <Router>
        <Routes>
         
          <Route path="/signup" element={<SignUp></SignUp>} />
          <Route path="/signin" element={<SignIn></SignIn>} />
          <Route path="/home" element={<ProtectedRoute>
            <Home></Home>
          </ProtectedRoute>} />
          <Route path="/" element={<ProtectedRoute >
            <Home></Home>
          </ProtectedRoute>} />
          
        </Routes>
      
    </Router>
  );
}

export default App;
