import React from "react";
import Balance from "./Balance";
const Landing = () => {
  return (
    <>
      <div className="m-8">
        <Balance value={"10,000"} />
        <Users />
      </div>
    </>
  );
};

export default Landing;
