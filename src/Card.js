import { useState } from "react";
import up from './media/up.svg';
import down from './media/down.svg';
import NavigateButtons from "./NavigateButtons";

export default function Card(props) {

    const [clickedCard, setClickedCard] = useState(false)

    const mountedStyle = { animation: "inAnimation 1s" };
    const unmountedStyle = {
        animation: "outAnimation 1s ",
        animationFillMode: "forwards"
    };

    const handleClick = () => {
        console.log('click', clickedCard);
        setClickedCard(!clickedCard);
        setInterval(() => { // esto actualzia el centro del mapa
            props.map.invalidateSize()
        }, "10", 1000);
    }

    return (
        <>
            {props.currentMarker.img &&
                <div className="card"
                    //    style={{ height: clickedCard ? "50%" : "10vh" }}
                    style={clickedCard ? mountedStyle : unmountedStyle}
                >
                    <div
                        className="openClose"
                        onClick={handleClick}
                    >  {/* pequeño icono abrir/cerrar */}
                        <img src={clickedCard ? down : up} />
                    </div>
                    <h1>{props.currentMarker.nombre}</h1>
                    <>
                        < img
                            style={{
                                margin: "0 auto",
                                height: "auto",
                                width: "200px",
                                marginBottom: "20px"
                            }}
                            src={require(`${props.currentMarker.img}`)}
                        />
                        <NavigateButtons
                            movie={props.movie}
                            map={props.map}
                            currentMarker={props.currentMarker}
                            setCurrentMarker={props.setCurrentMarker}
                        //mapPosition={props.mapPosition}
                        //setMapPosition={props.setMapPosition}
                        />
                    </>
                </div >
            }
        </>
    )
}
