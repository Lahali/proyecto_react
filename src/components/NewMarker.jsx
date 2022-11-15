import { useState } from "react";
import { Marker, Tooltip, useMapEvents } from "react-leaflet";
import { Link } from "react-router-dom";


export default function NewMarker(props) {

    const [newMarkerPosition, setNweMarkerPosition] = useState();


    useMapEvents({

        click: (e) => { // aqui ponerle una condicion que si haces click en otro sitio del mapa desaparece el marker y tooltip
            console.log('E', e)
            setNweMarkerPosition(e.latlng);

        },
        /* click: (e) => {
            console.log('E', e)
            map.locate()
        },
        locationfound: (location) => {

            console.log('location found:', location.latlng)
            props.setNweMarkerPosition(location.latlng);
        }, */

    })
    return (
        <>
            {newMarkerPosition && <Marker //componente de ReactLeaflet
                position={newMarkerPosition} >
                <Tooltip //componente de ReactLeaflet
                    permanent // siempre visible
                    interactive> {/* hace que se pueda hacer click dentro por ejemplo */}
                    <div className="tooltip">
                        {/* falta pasar a addScene las coordinadas */}
                        <Link to='/addScene' state={{latlng: newMarkerPosition}}>Añade una escena<br />en esta posicion!</Link>
                    </div>
                </Tooltip>
            </Marker>}
        </>
    )
}