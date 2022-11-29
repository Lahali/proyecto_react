import { MapContainer, TileLayer } from 'react-leaflet'
import DisplayMarkers from '../components/DisplayMarkers';
import NewMarker from '../components/NewMarker'
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import { useEffect } from 'react';
import * as L from "leaflet";
import "font-awesome/css/font-awesome.min.css";

export default function Map(props) {


    const mapURL3 = 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
    const attrib = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    const mapURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    const mapURL1 = 'https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png' // serve token
    const mapURL4 = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

    const mapURL2 = 'https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png' // serve token
    


    // boton "va a tu posicion"
    useEffect(() => {
      if (!props.map) return;
      L.easyButton("fa-map-marker", () => {
        props.map.locate().on("locationfound", function (e) {
        props.map.flyTo(e.latlng, 12);
        });
      }).addTo(props.map);
    }, [props.map]);
  

return (
 <div className= 'mapContainer'>
  {/* para cargar esperamos de recibir los datos de triangulation */}
          {props.triangulation &&
          <MapContainer // este componente de React-Leaflet crea el mapa
            ref={props.setMap} // whenCreated={setMap} esta era la forma antigua de hacerlo
            scrollWheelZoom={true}
            bounds={props.triangulation} // ALGUN ERROR POR AQUI?
            boundsOptions={{ padding: [50, 50] }}
            attributionControl={false} // quitamos la atribucion
          >
              <TileLayer // componenete de React-Leaflet para decidir el mapa (url) 
                attribution={attrib}
                url={mapURL}
              />

            <NewMarker // para agregar al mapa para una nueva escena
              map={props.map}
              currentMarker={props.currentMarker}
              setCurrentMarker={props.setCurrentMarker}
              boxIsOpen={props.boxIsOpen}
              setBoxIsOpen={props.setBoxIsOpen}
                />

            <DisplayMarkers // eseña los marker en el mapa
              arrayScenes={props.arrayScenes}
              currentMarker={props.currentMarker}
              setCurrentMarker={props.setCurrentMarker}
              prevCurrentMarkertRef={props.prevCurrentMarkertRef}
            />
          </MapContainer  >}
        </div>
)
}
