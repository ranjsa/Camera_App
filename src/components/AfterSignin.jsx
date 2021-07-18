import React from 'react';

const AfterSignin = ({ image, state }) => {
  return (
    <>
      <div className="">
        <div class="bg-contain bg-center">
          <img src={image} alt="" />
        </div>
        <div>
          <h1>{state.sessionId}</h1>
          <h1>{state.cancelReturnURL}</h1>
          <h1>{state.wid}</h1>
          <h1>{state.ledger_currency}</h1>
          <h1>{state.env}</h1>
          <h1>{state.controller}</h1>
          <h1>{state.coe}</h1>
          <h1>{state.merchantId}</h1>
          <h1>{state.origin_url}</h1>
          <h1>{state.product_type}</h1>
          <h1>{state.action}</h1>
          <h1>{window.customer_id}</h1>
        </div>
      </div>
    </>
  );
};
export default AfterSignin;
