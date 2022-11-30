import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle, addLog } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

function Login() {
  //verify user
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();


  //temp for testing logs 
  /*const handleSubmit = (event) => {
    event.preventDefault();
    addLog(user);
}; */
//check if user is logged in and then go to home page
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
        navigate("/home")
        window.location.reload(false);
    } ;
  }, [user, loading]);
  //display login
  return (
    // ADD onSubmit={handleSubmit} to form if testing logs
    <form className="login">
      <div className="login__container">
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </form>
  );
}

export default Login;