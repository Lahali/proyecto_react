import { Marker, Tooltip, useMapEvents } from "react-leaflet";
import { Link } from "react-router-dom";


export default function NewMarker(props) {

    useMapEvents({

        click: (e) => {
            console.log('E', e)
            props.setNweMarkerPosition(e.latlng);

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
            {props.newMarkerPosition && <Marker //componente de ReactLeaflet
                position={props.newMarkerPosition} >
                <Tooltip //componente de ReactLeaflet
                    permanent // simpre visible
                    interactive> {/* hace que se pueda hacer click dentro por ejemplo */}
                    <div className="tooltip">
                        {/* falta pasar a addScene las coordinadas */}
                        <Link to='./addScene'>Añade una escena<br />en esta posicion!</Link>
                    </div>
                </Tooltip>
            </Marker>}
        </>
    )
}