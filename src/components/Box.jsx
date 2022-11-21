import up from "../media/up.svg";
import down from "../media/down.svg";
import NavigateButtons from "./NavigateButtons";
import { isEmpty } from "@firebase/util";
import "../style_Box.css"; // lo importo solo aqui de momento!
import { connectFirestoreEmulator } from "firebase/firestore";

export default function Box(props) {
  //funciones de activación de los botones
  const buttonAction = (action) => {
    let nextIndexEscena;
    let lengthArrayScenes = props.arrayScenes.length;
    let indexEscena = props.arrayScenes.findIndex(
      (escena) =>
        escena.properties.scene_title === props.currentMarker.scene_title
    );
    if (action === "next") {
      if (indexEscena === lengthArrayScenes - 1) {
        nextIndexEscena = 0;
      } else {
        nextIndexEscena = indexEscena + 1;
      }
    } else {
      if (indexEscena === 0) {
        nextIndexEscena = lengthArrayScenes - 1;
      } else {
        nextIndexEscena = indexEscena - 1;
      }
    }

    props.setCurrentMarker({
      scene_title: props.arrayScenes[nextIndexEscena].properties.scene_title,
      movie_title: props.arrayScenes[nextIndexEscena].properties.movie_title,
      img: props.arrayScenes[nextIndexEscena].properties.img,
      coordinates: props.arrayScenes[nextIndexEscena].geometry.coordinates,
      index: nextIndexEscena,
    });
    props.map.flyTo(
      props.arrayScenes[nextIndexEscena].geometry.coordinates,
      this,
      { animate: true, duration: 1 }
    );
  };

  function updateMapWhenResze() {
    let timing = 0;
    const interval = setInterval(updateMap, 10); // cada 10 milisegundos
    function updateMap() {
      props.map.invalidateSize();
      console.log("UPDATE! BOX");
      timing++;
      if (timing > 200) {
        // 100 veces 10 milisegundos son 1s
        clearInterval(interval);
      }
    }
  }

  // este handle activa que el puntero se centre en la transicion mientras se abre el box
  const handleClick = () => {
    props.boxPosition === "isOpen"
      ? props.setBoxPosition("isClose")
      : props.setBoxPosition("isOpen");
    updateMapWhenResze();
  };

  // esto para elijir entre las tres clases del "box"
  const boxStyle = () => {
    if (isEmpty(props.currentMarker)) {
      console.log("isEmpty!!!!!!!!!!");
      return "boxHidden";
    } else if (props.boxPosition === "isOpen") {
      // console.log('boxOpen');
      return "boxOpen";
    } else {
      // console.log('boxClosed');
      return "boxClosed";
    }
  };

  return (
    <>
      <div className={`${boxStyle()} bg-base-200`}>
        <div
          className="openCloseBox bg-primary rounded-t-lg flex justify-center items-center"
          onClick={handleClick}
        >
          {props.boxPosition === "isOpen" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          )}
        </div>

        <div className="p-2">
          <p className="mx-2 text-md lg:text-lg">
            {props.currentMarker.movie_title}
          </p>
        </div>
        <div className="p-2 flex justify-between">
          <p className="mx-2 font-semibold text-lg lg:text-xl ">
            {props.currentMarker.scene_title}
          </p>

          <label htmlFor="my-modal-6" className="mx-2 link ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          </label>
        </div>

        {props.boxPosition === "isOpen" && (
          <div className="imgContainer carousel-item relative w-full">
            <img
              className="mt-4 object-cover w-full h-48"
              src={props.currentMarker.img}
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <button
                onClick={() => buttonAction("next")}
                className="buttonImg text-white"
              >
                ❮❮
              </button>
              <button
                onClick={() => buttonAction("next")}
                className="buttonImg text-white"
              >
                ❯❯
              </button>
            </div>
          </div>
        )}

        {/* MODAL */}
        <input type="checkbox" id="my-modal-6" className="modal-toggle" />

        <div className="modal modal-bottom sm:modal-middle z-[9999] ">
          <div className="modal-box bg-base-200">
            <h3 className="font-bold text-lg">
              {props.currentMarker.movie_title}
            </h3>
            <h4 className="font-semibold text-lg">
              {props.currentMarker.scene_title}
            </h4>

            <div className="imgContainer carousel-item relative w-full">
              <img
                className="mt-4 object-cover w-auto h-"
                src={props.currentMarker.img}
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <button
                  onClick={() => buttonAction("next")}
                  className="buttonImg text-white"
                >
                  ❮❮
                </button>
                <button
                  onClick={() => buttonAction("next")}
                  className="buttonImg text-white"
                >
                  ❯❯
                </button>
              </div>
            </div>
            <p className="py-4">
              Aquí va el texto de la descripción, pero no encuentro cómo
              conseguirlo
            </p>

            <div className="flex justify-end h-8">
              <label
                htmlFor="my-modal-6"
                className="link modalBox m-2"
                // onClick={props.setBoxPosition("isClose")}
              >
                cerrar
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="p-4 absolute flex justify-between transform peer-checked:-translate-y-1/2 left-5 right-5 top-1/2">
          <svg
            onClick={() => buttonAction("previous")}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white lg:text-black md:text-black cursor-pointer"
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
            className="w-6 h-6 text-white lg:text-black md:text-black cursor-pointer"
            >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
          </svg>
        </div> */
}
