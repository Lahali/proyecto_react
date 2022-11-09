import { useState } from "react";
import up from "../media/up.svg";
import down from "../media/down.svg";
import NavigateButtons from "./NavigateButtons";

export default function Card(props) {
  const [clickedCard, setClickedCard] = useState(false);

  // animacion que sube y baja la card (mirar CSS)
  const mountedStyle = { animation: "inAnimation 1s" };
  const unmountedStyle = {
    animation: "outAnimation 1s ",
    animationFillMode: "forwards",
  };

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
      {
        props.currentMarker.img && (
          <div className="collapse" onClick={handleClick}>
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Click me to show/hide content
            </div>
            <div className="flex flex-col collapse-content">
              <NavigateButtons
                    movie={props.movie}
                    map={props.map}
                    currentMarker={props.currentMarker}
                    setCurrentMarker={props.setCurrentMarker}
                />
                <img src="https://placeimg.com/640/480/any" />
            </div>
          </div>
        )

        // <div className="card"
        //     //    style={{ height: clickedCard ? "50%" : "10vh" }}
        //     style={clickedCard ? mountedStyle : unmountedStyle}
        // >
        //     <div
        //         className="openClose"
        //         onClick={handleClick}
        //     >  {/* pequeño icono abrir/cerrar */}
        //         <img src={clickedCard ? down : up} />
        //     </div>
        //     <h1>{props.currentMarker.nombre}</h1>
        //     <>
        //         < img
        //             style={{
        //                 margin: "0 auto",
        //                 height: "auto",
        //                 width: "200px",
        //                 marginBottom: "20px"
        //             }}
        //             //src={require(`${props.currentMarker.img}`)} // el require te permite no importarlas
        //             // ahora la imagen es hardcoded
        //             src={require('../data/img/02.jpg')} // el 'require' te permite no importar las img

        //         />
        //         <NavigateButtons
        //             movie={props.movie}
        //             map={props.map}
        //             currentMarker={props.currentMarker}
        //             setCurrentMarker={props.setCurrentMarker}
        //         />
        //     </>
        // </div >
      }
    </>
  );
}
