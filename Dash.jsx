import { useState, useRef, useEffect } from 'react';
import * as handTrack from 'handtrackjs';
import logEvent from './logEvent';
import './Dash.css'

function CameraDetect() {
  let model = null;
  const modelParams = {
    flipHorizontal: false,
    maxNumBoxes: 20,
    iouThreshold: 0.5,
    scoreThreshold: 0.6,
  };
  
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isVideo, setIsVideo] = useState(false);
  const videoRef = useRef(null);
 
  useEffect(() => {
    startVideo();
  },[]);
  let video = videoRef.current;

  const startVideo = () => {
    handTrack.load(modelParams).then((lmodel) => {
      model = lmodel;
      model.fps = 24;
      setIsCameraOn(false);
    }).then(() => {
      video = videoRef.current;

      handTrack.startVideo(video).then((status) => {
        
        if(status) {
          video.style = "";
          setIsVideo(true);
          setInterval(runDetection, 10000)
          //runDetection();
        } else {
          alert("Please enable video");
        }
      })
    });
    
  }

  function runDetection() {
    model.detect(video).then((predictions) => {
      
      if(predictions) {
        logEvent();
        console.log('Predictions: ', predictions);

      }
      
      // model.renderPredictions(predictions, canvas, context, video);
      // if(isVideo) {  
      //   requestAnimationFrame(runDetection);
      // }
    });
  }

  return(
    <div className='Dash'>
        <h1>
          {!isCameraOn ? 'Camera On' : 'Loading...'}
        </h1>
        <video className='canvasbox' ref={videoRef} />  
    </div>
  );
}

export default CameraDetect;