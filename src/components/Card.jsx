import { useState } from "react";
import up from "../media/up.svg";
import down from "../media/down.svg";
import NavigateButtons from "./NavigateButtons";

export default function Card(props) {
  const [clickedCard, setClickedCard] = useState(false);

  // animacion que sube y baja la card (mirar CSS)
  // const mountedStyle = { animation: "inAnimation 1s" };
  // const unmountedStyle = {
  //   animation: "outAnimation 1s ",
  //   animationFillMode: "forwards",
  // };

  //funciones de activación de los botones
  const buttonAction = (action) => {
    let nextIndexEscena = 0;
    let lengthMovie = props.movie.features.length;
    let indexEscena = props.movie.features.findIndex(
      (escena) => escena.properties.escena === props.currentMarker.nombre
    );
    if (action === "next") {
      if (indexEscena === lengthMovie - 1) {
        nextIndexEscena = 0;
      } else {
        nextIndexEscena = indexEscena + 1;
      }
    } else {
      if (indexEscena === 0) {
        nextIndexEscena = lengthMovie - 1;
      } else {
        nextIndexEscena = indexEscena - 1;
      }
    }

    props.setCurrentMarker({
      nombre: props.movie.features[nextIndexEscena].properties.escena,
      img: props.movie.features[nextIndexEscena].properties.img,
      coordinates: [
        props.movie.features[nextIndexEscena].geometry.coordinates[1],
        props.movie.features[nextIndexEscena].geometry.coordinates[0],
      ],
      index: nextIndexEscena,
    });
    props.map.flyTo(
      [
        props.movie.features[nextIndexEscena].geometry.coordinates[1],
        props.movie.features[nextIndexEscena].geometry.coordinates[0],
      ],
      this,
      {
        animate: true,
        duration: 1,
      }
    );
  };

  // este handle activa que el puntero se centre al abrir la card
  const handleClick = () => {
    setClickedCard(!clickedCard);
    setInterval(
      () => {
        // esto actualzia el centro del mapa cuando se mueve la card
        props.map.invalidateSize();
      },
      "10",
      1000
    );
  };

  return (
    <>
      {props.currentMarker.img && (
        <div className="relative w-full overflow-hidden" onClick={handleClick}>
          <input
            className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
            type="checkbox"
          />

          {/* <div className="absolute top-1 right-3 text-black transition-transform duration-500 rotate-0 peer-checked:rotate-180">
            <svg
              xmlns="http://wwww.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div> */}

          <div className="p-2 mr-4 text-xl lg:text-2xl font-medium">
            Haz click para ver los detalles de {props.currentMarker.nombre}
          </div>
          <div className="flex flex-col overflow-hidden items-center transition-all duration-1000 max-h-0 peer-checked:max-h-max">
            {/* la propiedad -translate tiene que estar dentro del peer-checked xq sino, salen los botones de navegación tb cuando la card está cerrada */}
            <div className="p-4 absolute flex justify-between transform peer-checked:-translate-y-1/2 left-5 right-5 top-1/2">
              <svg
                onClick={() => buttonAction("previous")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white lg:text-black md:text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                />
              </svg>

              <svg
                onClick={() => buttonAction("next")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white lg:text-black md:text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
            <div>
              <img src="https://placeimg.com/640/480/any" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

{
  /* <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div> */
}
