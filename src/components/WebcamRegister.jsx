import React, { useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const videoConstraints = {
  width: 520,
  height: 500,
  facingMode: 'user',
};

const WebcamRegister = () => {
  const imgArray = [];
  const webcamRef = React.useRef(null);
  const [count, setCount] = useState(5);
  const [makeSubmmit, setSubmit] = useState(false);
  const capture = () => {
    if (count >= 1) {
      setCount(count - 1);
      const imageSrc = webcamRef.current.getScreenshot();
      imgArray.push(imageSrc);
      console.log(imgArray);
      console.log(count);
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
        'https://uolkz55l63.execute-api.us-east-1.amazonaws.com/v2/upload',
        { userKYC },
        {
          headers: {
            'Content-Type': `application/json`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
              'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          },
        }
      );
      console.log('👉 Returned data:', response);
    } catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
    }
  };
  return (
    <>
      <h1 style={{backgroundColor: "#000000"}} className="text-center py-5 text-xl font-bold text-white">
        Capture and Submit Your Image!
      </h1>
      <div className="">
        <div className="my-10">
          <div class="flex flex-wrap justify-center">
            <div class="w-6/12 sm:w-4/12 px-4">
              <Webcam
                audio={false}
                height={400}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={520}
                videoConstraints={videoConstraints}
              />
            </div>
          </div>
        </div>

        <div>
          {makeSubmmit || count === 0 ? (
            <button
            style={{backgroundColor: "#FF9900"}}
              onClick={(e) => {
                e.preventDefault();
                formSubmit();
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          ) : (
            <button
            style={{backgroundColor: "#FF9900"}}
              onClick={(e) => {
                e.preventDefault();
                capture();
              }}
              className="text-white font-bold py-2 px-4 rounded"
            >
              Capture
              {' ' + count}
            </button>
          )}
        </div>
    </div>
    </>
  );
};
export default WebcamRegister;
/*
    // try {
    //   fetch(
    //     'https://uolkz55l63.execute-api.us-east-1.amazonaws.com/v2/upload',
    //     {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json',
    //       'Access-Control-Allow-Origin': '*',
    //     },
    //       body: JSON.stringify(userKYC),
    //     }
    //   ).then(() => {
    //     console.log('new blog added');
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
*/
