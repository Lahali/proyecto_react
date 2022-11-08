import React from "react";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";

export default function Welcome(){
  
  return (
    <div className="flex flex-col p-3">
      <label htmlFor="my-modal-signup" className="btn btn-primary md:w-1/5 m-3">
       registrarse
      </label>
      <label htmlFor="my-modal-login" className="btn btn-primary md:w-1/5 m-3">entrar</label>
      <Signup/>
      <Login/>
    </div>
  );
}