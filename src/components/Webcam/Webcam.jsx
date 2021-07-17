import React, { useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const videoConstraints = {
  width: 420,
  height: 300,
  facingMode: 'user',
};

export const WebcamCapture = () => {
  const imgArray = [];
  const webcamRef = React.useRef(null);
  const [count, setCount] = useState(5);
  const [makeSubmmit, setSubmit] = useState(false);
  const capture = () => {
    if (count>=1) {
      
      setCount(count - 1);
      const imageSrc = webcamRef.current.getScreenshot();
      imgArray.push(imageSrc);
      console.log(imgArray);
      console.log(count)
    } else {
      setSubmit(true);
    }
  };
  const userKYC = {
    customer_id: 'A37B2O7S12FMWC',
    image_array: imgArray,
  };
  const formSubmit = async () => {
    try {
      const response = await axios.post(
        'https://uolkz55l63.execute-api.us-east-1.amazonaws.com/v1/upload',
        { userKYC },
        {
          headers: {
            'Content-Type': `application/json` 
          }
        }
      );
      console.log('👉 Returned data:', response);
    } catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
    }
  };
  return (
    <div className="webcam-container">
      <Webcam
        audio={false}
        height={400}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={520}
        videoConstraints={videoConstraints}
      />
      <div>
        {makeSubmmit || count === 0 ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              formSubmit();
            }}
            className="webcam-btn"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              capture();
            }}
            className="webcam-btn"
          >
            Capture
            {' ' + (count)}
          </button>
        )}
      </div>
    </div>
  );
};
