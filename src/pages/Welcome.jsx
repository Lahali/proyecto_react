import React from "react";
import { Link } from "react-router-dom";


export default function Welcome(){
  
  return (
    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <img src="https://placeimg.com/260/400/arch" className="max-w-sm rounded-lg shadow-2xl" />
      <div>
        <h1 className="text-5xl font-bold">Bievenido!</h1>
        <p className="py-6">Busca, encuentra y visita dónde se rodaron tus películas favoritas.</p>
        <Link to="/home">
        <button className="btn btn-primary lg:w-40">Entrar</button>
        </Link>
      </div>
    </div>
  </div>
    );
}
  // <div className="flex flex-col p-3">
  //   <label htmlFor="my-modal-signup" className="btn btn-primary md:w-1/5 m-3">
  //    registrarse
  //   </label>
  //   <label htmlFor="my-modal-login" className="btn btn-primary md:w-1/5 m-3">entrar</label>
  //   <Signup/>
  //   <Login/>
  // </div>