import { useEffect, useRef, useState } from "react";

import { Marker, Tooltip, useMap, useMapEvents } from "react-leaflet";
import { isEmpty } from "@firebase/util";

import { Link } from "react-router-dom";


export default function NewMarker(props) {

    const [newMarkerPosition, setNweMarkerPosition] = useState();
    const [toogle, setToogle] = useState(false) // esto sirve solo para que no salga el marker a cada click (CUTRADAAAAA)

/*     function updateMapWhenResze(){
        let timing = 0;
        const interval = setInterval(updateMap, 10); // cada 10 milisegundos
        function updateMap() {
          props.map.invalidateSize();
          console.log('UPDATE! BOX')
          timing++;
          if (timing > 200) { // 100 veces 10 milisegundos son 1s
            clearInterval(interval);
          }}
      } */

    useMapEvents({
        click: (e) => {
            console.log('CLICK newMarker')

                props.setCurrentMarker({})
                setNweMarkerPosition(e.latlng);
                
                if (isEmpty(props.currentMarker)) {
                    setToogle(!toogle) 
                    // !toogle && leafletMap.panTo(e.latlng); // esto para centrar el mapa donde sale el tooltip
                } else {
                    // esto pasa alguna vez?
                return;
                            }
        },      
    })

    // let renderCondition = ()=> {
    //     if ()
    // }

// console.log('props.currentMarker IsEMPTY', (isEmpty(props.currentMarker)))
     return (
        <>
           
            {(newMarkerPosition && (toogle && isEmpty(props.currentMarker))) && <Marker //componente de ReactLeaflet
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