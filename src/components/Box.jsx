import { isEmpty } from "@firebase/util";
import "../style_Box.css"; // lo importo solo aqui de momento!
import imgNotFound from '../image/broken-2.jpg'

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
      scene_description:
        props.arrayScenes[nextIndexEscena].properties.scene_description,
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
      timing++;
      if (timing > 200) {// 200 veces 10 milisegundos son 1s
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
      return "boxHidden";
    } else if (props.boxPosition === "isOpen") {
      return "boxOpen";
    } else {
      return "boxClosed";
    }
  };

  return (
    <>
      <div className={`${boxStyle()} bg-gray-100 `}>
        <div
          className="openCloseBox bg-secondary flex justify-center items-center h-6"
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

        <div className="">
          <p className="mx-4 mt-3 text-xl lg:text-lg text-gray-600 italic underline underline-offset-4 decoration-gray-200	 ">
            {props.currentMarker.movie_title}
          </p>
        </div>
        <div className=" flex justify-between">
          <p className="mx-4 mt-1 font-semibold text-xl lg:text-xl text-gray-900 tracking-wide">
            {props.currentMarker.scene_title}
          </p>

          {props.boxPosition === "isOpen" && <label htmlFor="my-modal-6" className="mx-2 link ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          </label>}
        </div>

        {props.boxPosition === "isOpen" && (
          <div className="imgContainer carousel-item relative w-full flex">
            <img
              className="mt-4 object-cover w-full h-auto max-h-60"
              src={props.currentMarker.img}
              onError={(e) => (e.target.src = imgNotFound)}
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

        <div className="modal modal-bottom sm:modal-middle z-[9999]">
          <div className="modal-box bg-gray-100">
          <div className="flex justify-end h-8">
              <label
                htmlFor="my-modal-6"
                className="text-gray-700 font-bold text-2xl hover:text-secondary-focus"
              >
                X
              </label>
            </div>
            <h3 className="font-bold text-lg text-gray-700">
              {props.currentMarker.movie_title}
            </h3>
            <h4 className="font-semibold text-lg text-gray-700">
              {props.currentMarker.scene_title}
            </h4>

            <div className="flex flex-col justify-center items-center py-4">
              <img
                className="w-screen h-auto"
                src={props.currentMarker.img}
              />

            </div>
            <p className="py-4 text-gray-700" >{props.currentMarker.scene_description}</p>

          </div>
        </div>
      </div>
    </>
  );
}


