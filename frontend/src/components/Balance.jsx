import React from "react";
 const Balance = (balance) => {
  return (
    <>
      <div>
        <input type="text" className="bg-blue-200 rounded-lg" readOnly/>
        <p>{balance}</p>
      </div>
    </>
  );
};
export default Balance;
