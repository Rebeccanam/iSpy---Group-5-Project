import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle, addLog } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Home.css";

//for daily notification
import { db } from './firebase';
import { collection, getDocs } from "firebase/firestore";
import addNotification from 'react-push-notification';


function Home() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    dailyNotification();
  },[]);
  
  const dailyNotification = () => {
    getDocs(collection(db, "activity-log"))
            .then((querySnapshot)=>{               
                let newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                    
                    let currentDate = new Date();
                    let day = currentDate.getDate();
                    let month = currentDate.getMonth();
                    let year = currentDate.getFullYear();
                    let notificationTotal = newData.length;
                    newData.forEach((value, key) => {
                        let timestamp = new Date(value.timestamp.toDate());
                        let tsday = timestamp.getDate();
                        let tsmonth = timestamp.getMonth();
                        let tsyear = timestamp.getFullYear();
                        
                        if(tsday != day || tsmonth != month || tsyear != year) {
                            delete newData[key];
                            notificationTotal--
                        }
                    })
                    
                    addNotification({
                      title: "today's notifications",
                      message: notificationTotal,
                      duration: 4000,
                      native: true
                  });
                    
            })
  }

  //temp for testing logs 
  /*const handleSubmit = (event) => {
    event.preventDefault();
    addLog(user);
}; */
// all navigation button and functions
  const navLogs =() => {
    if (user) {
        navigate("/logs")
        window.location.reload(false);
    } ;
  };

  const navProfile =() => {
    if (user) {
        navigate("/profile")
        window.location.reload(false);
    } ;
  };

  const navDash =() => {
    if (user) {
        navigate("/dashboard")
        window.location.reload(false);
    } ;
  };
  // display home page
  return (
    // ADD onSubmit={handleSubmit} to form if testing logs
    <div className="home-container">
        <div className="btn-container">
            <h2>Home</h2>
            <button className="logs-btn" onClick={navLogs}>Activity Logs</button>
            <button className="profile-btn" onClick={navProfile}>User Profile</button>
            <button className="dashboard-btn" onClick={navDash}>Dashboard</button>
        </div>

    </div>
  );
}

export default Home;