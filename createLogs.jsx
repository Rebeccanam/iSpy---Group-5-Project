import React from 'react'
import logEvent from './logEvent';
 
const Firestore = () => {
  return (
    <div>
      <center>
        <button onClick={logEvent}>Submit</button>
      </center>
    </div>
  );
}
 
export default Firestore;