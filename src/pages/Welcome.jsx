import React from "react";
import { Link } from "react-router-dom";


export default function Welcome(){
  
  return (
    <div className="homeBackground hero ">
    <div className="hero-content flex-col lg:flex-row-reverse">
      {/* <img src="https://placeimg.com/260/400/arch" className="max-w-sm rounded-lg shadow-2xl" /> */}
      <div>
        <h1 className="text-4xl font-bold">¿Dónde se rodó?</h1>
        <h2 className="text-3xl">Bienvenido</h2>
        <p className="py-6">Busca, encuentra y visita dónde se rodaron tus películas favoritas.</p>
        <p>Las reglas son sencillas:</p>
        <ul>
          <li>Busca si la película está en nuestra base de datos</li>
          <li>Explora las ubicaciones en nuestro mapa</li>
          <li>Colabora añadiendo nuevas películas o ampliando el número de escenas de las que ya tenemos</li>
        </ul>
        <Link to="/home">
        <button className="btn btn-secondary lg:w-40">Entrar</button>
        </Link>
      </div>
    </div>
  </div>
    );
}
