import { useState } from "react";
import { Marker, Tooltip, useMapEvents } from "react-leaflet";
import { Link } from "react-router-dom";


export default function NewMarker(props) {

    const [newMarkerPosition, setNweMarkerPosition] = useState();
    const [toogle, setToogle] = useState(false) // esto sirve solo para que no salga el marker a cada click


    useMapEvents({
        click: (e) => {
            console.log('E', e)
            setNweMarkerPosition(e.latlng);
            setToogle(!toogle)
        },      
    })

    return (
        <>

{/* aqui ponerle una condicion que si haces click en otro sitio del mapa desaparece el marker y tooltip */}
            
            {(newMarkerPosition && toogle) && <Marker //componente de ReactLeaflet
                position={newMarkerPosition} >
                <Tooltip //componente de ReactLeaflet
                    permanent // siempre visible
                    interactive> {/* hace que se pueda hacer click dentro por ejemplo */}
                    <div className="tooltip">
                        <Link to='/addScene' state={{latlng: newMarkerPosition}}>Añade una escena<br />en esta posicion!</Link>
                    </div>
                </Tooltip>
            </Marker>}
        </>
    )
}



/* click: (e) => {
    console.log('E', e)
    map.locate()
},
locationfound: (location) => {

    console.log('location found:', location.latlng)
    props.setNweMarkerPosition(location.latlng);
}, */