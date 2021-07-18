import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import AfterSignin from './AfterSignin';

const videoConstraints = {
  width: 520,
  height: 500,
  facingMode: 'user',
};
const WebcamSignin = () => {
  const [imageCapture, setImageCapture] = useState('');
  const webcamRef = React.useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setImageCapture(webcamRef.current.getScreenshot());
      console.log('captured');
    }, 4000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <h1
        style={{ backgroundColor: '#000000' }}
        className="text-center py-5 text-xl font-bold text-white"
      >
        pay with Smile
      </h1>
      <div className="">
        <div className="my-10">
          <div className="flex flex-wrap justify-center">
            <div className="w-6/12 sm:w-4/12 px-4">
              {imageCapture === '' ? (
                <>
                 <h1>Capturing Image, stay still</h1>
                  <Webcam
                    audio={false}
                    height={400}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={520}
                    videoConstraints={videoConstraints}
                  />
                </>
              ) : (
                <>
                  <AfterSignin image={imageCapture} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default WebcamSignin;
