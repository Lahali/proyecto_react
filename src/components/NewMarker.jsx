import { useState } from "react";
import { Marker, Tooltip, useMapEvents } from "react-leaflet";
import { isEmpty } from "@firebase/util";
import { Link } from "react-router-dom";

export default function NewMarker(props) {
  const [newMarkerPosition, setNweMarkerPosition] = useState();
  const [toogle, setToogle] = useState(false); // esto sirve solo para que no salga el marker a cada click (CUTRADAAAAA)

  useMapEvents({
    click: (e) => {
      props.setCurrentMarker({});
      setNweMarkerPosition(e.latlng);

      if (isEmpty(props.currentMarker)) {
        setToogle(!toogle);
      } else {
        // esto pasa alguna vez?
        return;
      }
    },
  });


  return (
    <>
      {newMarkerPosition && toogle && isEmpty(props.currentMarker) && (
        <Marker //componente de ReactLeaflet
          position={newMarkerPosition}
        >
          <Tooltip //componente de ReactLeaflet
            permanent // siempre visible
            interactive
          >
            {" "}
            {/* hace que se pueda hacer click dentro por ejemplo */}
            <div className="tooltip">
              <Link to="/addScene" state={{ latlng: newMarkerPosition }}>
                Añade una escena
                <br />
                en esta posicion!
              </Link>
            </div>
          </Tooltip>
        </Marker>
      )}
    </>
  );
}

