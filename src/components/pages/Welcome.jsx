import React from "react";
import Signup from "./Signup";

const Welcome = () => {
  return (
    <div className="flex flex-col p-3">
      <label htmlFor="my-modal-6" className="btn btn-primary md:w-1/5">
       registrarse
      </label>
      <Signup/>
    </div>
  );
};

export default Welcome;
