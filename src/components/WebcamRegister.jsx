import React, { useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const videoConstraints = {
  width: 520,
  height: 500,
  facingMode: 'user',
};

const WebcamRegister = () => {
  const {customerid} = useParams();
  const [imgArr, setImgArr] = useState([]);
  const webcamRef = React.useRef(null);
  const [count, setCount] = useState(5);
  const [makeSubmmit, setSubmit] = useState(false);
  const capture = () => {
    if (count >= 1) {
      setCount(count - 1);
      let imageSrc = webcamRef.current.getScreenshot();
      imageSrc = imageSrc.replace("data:image/jpeg;base64,","");
      setImgArr([...imgArr, {id: imgArr.length, value: imageSrc}])
    } else {
      setSubmit(true);
    }
  };
  let userKYC = {
    customer_id: customerid,
    image: imgArr
  };
  const formSubmit = async () => {
    //await setImageArr(JSON.stringify(imgArray));
    userKYC = await JSON.stringify(userKYC);
    try {
      const response = await axios.post(
        'https://w7hfmjr0b8.execute-api.us-east-1.amazonaws.com/v1/register',
        { userKYC },
        {
          headers: {
            'Content-Type': `application/json`
          },
        }
      );
      console.log('👉 Returned data:', response);
    } catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
    }
  };
  return (
    <div className="bg-opacity-100">
      <h1 style={{backgroundColor: "#000000"}} className="text-center font-sans py-5 text-xl font-bold text-white">
        Capture and Submit Your Image!
      </h1>
      <div className="">
        <div className="my-10">
          <div className="flex flex-wrap justify-center">
            <div className="w-6/12 sm:w-4/12 px-4 shadow-2xl">
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
    </div>
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
