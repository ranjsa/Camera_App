import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import AfterSignin from './AfterSignin';
import { useLocation } from 'react-router-dom';
const videoConstraints = {
  width: 520,
  height: 500,
  facingMode: 'user',
};
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const WebcamSignin = () => {
  const [state, setState] = useState({});
  const params = useQuery();
  const sessionId = params.get('amazonCheckoutSessionId');
  const cancelReturnURL = params.get('cancelReturnURL');
  const wid = params.get('wid');
  const product_type = params.get('product_type');
  const origin_url = params.get('origin_url');
  const merchantId = params.get('merchantId');
  const ledger_currency = params.get('ledger_currency');
  const isLegacyExpressCheckout = params.get('isLegacyExpressCheckout');
  const env = params.get('env');
  const controller = params.get('controller');
  const coe = params.get('coe');
  const action = params.get('action');
  const [imageCapture, setImageCapture] = useState('');
  const webcamRef = React.useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setImageCapture(webcamRef.current.getScreenshot());
      console.log('captured');
    }, 4000);
    state.sessionId = sessionId;
    state.cancelReturnURL = cancelReturnURL;
    state.wid = wid;
    state.ledger_currency = ledger_currency;
    state.env = env;
    state.controller = controller;
    state.coe = coe;
    state.isLegacyExpressCheckout = isLegacyExpressCheckout;
    state.merchantId = merchantId;
    state.origin_url = origin_url;
    state.product_type = product_type;
    state.action = action;
    setState(state);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <h1
        style={{ backgroundColor: '#000000' }}
        className="text-center py-5 text-xl font-bold text-white"
      >
        Pay with Smile
      </h1>
      <div className="">
        <div className="my-10">
          <div className="flex flex-wrap justify-center">
            <div className="w-6/12 sm:w-4/12 px-4">
              {imageCapture === '' ? (
                <>
                 <h1>Capturing Image, Smile please !! 😃 </h1>
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
                  <AfterSignin image={imageCapture} state={state}/>
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
