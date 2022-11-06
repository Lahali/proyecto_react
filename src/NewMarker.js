import { Marker, Tooltip, useMapEvents } from "react-leaflet";
import { Link } from "react-router-dom";


export default function NewMarker(props) {

    // const map = useMapEvents({
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
    //console.log({ props.newMarkerPosition })
    return (
        <>
            {props.newMarkerPosition && <Marker
                position={props.newMarkerPosition} >
                <Tooltip

                    interactive //hace que se pueda hacer click dentro por ejemplo
                >

                    {/* pasamos a addScene las coordinadas */}
                    <Link to='./addScene'>Añade una escena aqui!</Link>
                </Tooltip></Marker>}
        </>
    )
}