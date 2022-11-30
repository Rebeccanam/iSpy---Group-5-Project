import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import "./Profile.css";

function Profile() {
  // verify user data
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      // get user data
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      console.log(doc);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  // log user out
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);
  // display profile
  return (
    <div className="profile">
       <div className="profile-container">
        <h2>Logged in as</h2>
         <div className="user-email">{user?.email}</div>
         <button className="profile-logout" onClick={logout}>
          Logout
         </button>
       </div>
     </div>
  );
}
export default Profile;
