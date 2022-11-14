import { MapContainer, TileLayer } from 'react-leaflet'
import DisplayMarkers from '../components/DisplayMarkers';
import NewMarker from '../components/NewMarker'


export default function Map(props) {

    const mapURL0 = 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
    const attrib = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    const mapURL3 = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    const mapURL1 = 'https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png' // serve token
    const mapURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    const mapURL2 = 'https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png' // serve token
    

return (
<div className='mapContainer'>
          <MapContainer // este componente de React-Leaflet crea el mapa
            ref={props.setMap} // whenCreated={setMap} esta era la forma antigua de hacerlo
            center={[41.4, 2.17]}
            zoom={12}
            scrollWheelZoom={true}
          >
            <TileLayer // componenete de React-Leaflet para decidir el mapa (url) 
              attribution={attrib}
              url={mapURL}
            />

            <NewMarker // para agregar el mapa para una nueva escena
              map={props.map}
            />

            <DisplayMarkers // eseña los marker en la mapa
              title={props.movie.title}
              movieFeatures={props.movie}
              currentMarker={props.currentMarker}
              setCurrentMarker={props.setCurrentMarker}
            />
          </MapContainer  >
        </div>
)
}
