import { db } from './firebase';
import { collection, addDoc, serverTimestamp, } from "firebase/firestore";
import addNotification from 'react-push-notification';

const logEvent = () => {
  const docRef = addDoc(collection(db, "activity-log"), {
    message: "ALERT! MOTION DETECTED", 
    timestamp: serverTimestamp()
  })
  .then((docRef) => {
      console.log("Data successfully submitted");
  })
  .then(() => {
    addNotification({
      title: 'ALERT!',
      message: 'MOTION DETECTED',
      duration: 4000,
      native: true
    });
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });

}

export default logEvent;