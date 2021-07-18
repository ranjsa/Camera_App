import React, { useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const videoConstraints = {
  width: 520,
  height: 500,
  facingMode: 'user',
};

const WebcamRegister = () => {
  const [imgArr, setImgArr] = useState([]);
  const webcamRef = React.useRef(null);
  const [count, setCount] = useState(5);
  const [makeSubmmit, setSubmit] = useState(false);
  const capture = () => {
    if (count >= 1) {
      setCount(count - 1);
      let imageSrc = webcamRef.current.getScreenshot();
      imageSrc = imageSrc.replace("data:image/jpeg;base64,","");
      setImgArr([... imgArr, {id: imgArr.length, value: imageSrc}])
    } else {
      setSubmit(true);
    }
  };
  const userKYC = {
    customer_id: 'A37B2O7S12FMWC',
    image: imgArr
  };
  const formSubmit = async () => {
    // await setImageArr(JSON.stringify(imgArray));
    try {
      const response = await axios.post(
        'https://w7hfmjr0b8.execute-api.us-east-1.amazonaws.com/v1/register',
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
      <h1 style={{backgroundColor: "#000000"}} className="text-center font-sans py-5 text-xl font-bold text-white">
        Capture and Submit Your Image!
      </h1>
      <div className="">
        <div className="my-10">
          <div class="flex flex-wrap justify-center">
            <div class="w-6/12 sm:w-4/12 px-4 shadow-2xl">
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
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
              className="text-white font-bold py-2 px-4"
            >
              <h1 className="font-bold">Capture {' ' + count}</h1>
              
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
