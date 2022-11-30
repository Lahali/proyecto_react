import React from "react";
import { Link } from "react-router-dom";
import useWindowDimensions from "../components/useWindowDimensions";
import camera from "../icon/movie-camera.svg";
import cameraMan from "../image/camera-man-sm.jpeg";

export default function Welcome() {
  const { height } = useWindowDimensions();

  return (
    <div style={{ height: `${height}px` }}>
      <div className="hero homeBackground relative">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div>
            <div className="flex flex-row justify-center lg:justify-start md:justify-start">
              <img src={camera} className="h-[35px]" />
              <h1 className="text-4xl font-bold text-gray-200 mx-4">
                ¿Dónde se rodó?
              </h1>
            </div>
            <div
              className="flex flex-col justify-center items-center
            lg:items-start md:items-start
            "
            >
              <p className="py-6 text-gray-200">
                Busca, encuentra y visita dónde se rodaron tus películas
                favoritas.
              </p>
              <img
                src={cameraMan}
                // "https://placeimg.com/260/260/arch"
                className="max-w-[260px] rounded-lg"
              />
            </div>
            <div className="my-5 ml-3">
              <p className="text-gray-200">Las reglas son sencillas:</p>
              <ul className="list-disc list-inside my-3 text-gray-300">
                <li>Busca si la película está en nuestra base de datos</li>
                <li>Explora las ubicaciones en nuestro mapa</li>
                <li>
                  Colabora! Puedes añadir películas o ampliar el número de
                  escenas de las que ya hay
                </li>
              </ul>
            </div>
            <Link to="/home">
              <button className="btn btn-secondary lg:w-40">Entrar</button>
            </Link>
            <div style={{height: '200px'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
