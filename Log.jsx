import { db } from './firebase';
import { useState, useRef } from 'react';
import { collection, getDocs } from "firebase/firestore";
import "./LogDisp.css"
 
const Read = () => {
    const [info , setInfo] = useState([]);
    //const [notificationCounter, setNotificationCounter] = useState(0);
    const notificationCounter = useRef(0);
    // Start the fetch operation as soon as
    // the page loads
    window.addEventListener('load', () => {
        Fetchdata();
      });
 
    // Fetch the required data using the get() method
    const Fetchdata = ()=>{
        getDocs(collection(db, "activity-log"))
            .then((querySnapshot)=>{               
                let newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                    
                    let currentDate = new Date();
                    let day = currentDate.getDate();
                    let month = currentDate.getMonth();
                    let year = currentDate.getFullYear();
                    notificationCounter.current = newData.length;
                    newData.forEach((value, key) => {
                        let timestamp = new Date(value.timestamp.toDate());
                        let tsday = timestamp.getDate();
                        let tsmonth = timestamp.getMonth();
                        let tsyear = timestamp.getFullYear();
                        
                        if(tsday != day || tsmonth != month || tsyear != year) {
                            delete newData[key];
                            notificationCounter.current--
                        }
                    })
                    setInfo(newData);
                    
            })
    }
    // Display the result on the page
    return (
        <div className="list-container">
            <h2>ACTIVITY LOGS</h2>
            <h2>Notifications Today: {notificationCounter.current}</h2>
        {
            info.map((data, i) => (
                <div className="log-container" key={i}>
                    {data.message}
                    <p>{new Date(data.timestamp.toDate()).toDateString()}</p>
                    
                </div>
            ))
        }
        </div>
 
    );
}
 
export default Read;