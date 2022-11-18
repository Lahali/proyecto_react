import { AttributionControl, MapContainer, TileLayer } from 'react-leaflet'
import DisplayMarkers from '../components/DisplayMarkers';
import NewMarker from '../components/NewMarker'

export default function Map(props) {


    const mapURL = 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
    const attrib = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    const mapURL0 = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    const mapURL1 = 'https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png' // serve token
    const mapURL3 = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    const mapURL2 = 'https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png' // serve token
    
    console.log('props.triangulation',props.triangulation)


return (
<div className='mapContainer'>
  {/* para cargar esperamos de recibir los datos de triangulation */}
          {props.triangulation &&
          <MapContainer // este componente de React-Leaflet crea el mapa
            ref={props.setMap} // whenCreated={setMap} esta era la forma antigua de hacerlo
            //center={[41.4, 2.17]}
            // zoom={12}
            scrollWheelZoom={true}
            bounds={props.triangulation}
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
            />
          </MapContainer  >}
        </div>
)
}
