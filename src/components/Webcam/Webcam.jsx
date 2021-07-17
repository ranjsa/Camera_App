import React, { useState } from 'react';
import Webcam from 'react-webcam';

//const WebcamComponent = () => <Webcam />;

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
    if (count > 1) {
      setCount(count - 1);
      const imageSrc = webcamRef.current.getScreenshot();
      imgArray.push(imageSrc);
      console.log(imgArray);
    } else {
      setSubmit(true);
    }
  };

  return (
    <div className="webcam-container">
      {/* <div className="webcam-img">
        {image === '' ? (
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={520}
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={image} alt=""/>
        )}
      </div> */}
      <Webcam
        audio={false}
        height={400}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={520}
        videoConstraints={videoConstraints}
      />
      <div>
        {makeSubmmit ? (
          <button className="webcam-btn">Submit</button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              capture();
            }}
            className="webcam-btn"
          >
            Capture
            {' ' + count}
          </button>
        )}
      </div>
    </div>
  );
};
