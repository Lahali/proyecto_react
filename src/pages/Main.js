import { MapContainer, TileLayer } from 'react-leaflet'
import { useState } from 'react';
import DisplayMarkers from '../components/DisplayMarkers';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import { useLocation } from 'react-router-dom' // esto para importar "props" con Link
import NewMarker from '../components/NewMarker'


export default function Main() {

  const [newMarkerPosition, setNweMarkerPosition] = useState();

  const location = useLocation()
  const { film } = location.state;
  const [movie, setMovie] = useState(film); // guardamo en un State los datos mandados dentro de Link
  const [map, setMap] = useState(null);

  const [currentMarker, setCurrentMarker] = useState({}); // el marker actualmente seleccionado
  //console.log('currentMarker::', currentMarker);
  
  const mapURL0 = 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
  const attrib = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  const mapURL3 = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  const mapURL1 = 'https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png' // serve token
  const mapURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  const mapURL2 = 'https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png' // serve token


  return (
    <>
      <Navbar
        title={movie.title}
      />

      <div className="mainContainer">

        <div className='mapContainer'>
          <MapContainer // este componente de React-Leaflet crea el mapa
            ref={setMap} // whenCreated={setMap} esta era la forma antigua de hacerlo
            center={[41.4, 2.17]}
            zoom={12}
            scrollWheelZoom={true}
          >
            <TileLayer // componenete de React-Leaflet para decidir el mapa (url) 
              attribution={attrib}
              url={mapURL}
            />

            <NewMarker // para agregar el mapa para una nueva escena
              newMarkerPosition={newMarkerPosition}
              setNweMarkerPosition={setNweMarkerPosition}
              map={map}
            />

            <DisplayMarkers // eseña los marker en la mapa
              title={movie.title}
              movieFeatures={movie.features}
              currentMarker={currentMarker}
              setCurrentMarker={setCurrentMarker}
            />
          </MapContainer  >
        </div>

        <Card // esta es la card que sube desde abajao "estilo Google Maps"
          movie={movie}
          currentMarker={currentMarker}
          setCurrentMarker={setCurrentMarker}
          map={map}
        />

      </div>
    </>
  )

}

//const mapURL = 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png'
// const leafletMap = useMap();
// useEffect(() => {
//   leafletMap.panTo(mapPosition)
// }, [mapPosition])

// console.log('movie:::', movie)
// console.log('currentMarker:::', currentMarker)

// useEffect(() => {
//   //map.setView(currentMarker.coordinates)
//   console.log('holaaaaaaa')
//   if (typeof (currentMarker.coordinates) != "undefined") {
//     map.panTo([0, 0])
//   }
// }, [clickedCard])

/*   useEffect(() => {
    if (map) {
      map.invalidateSize();
      console.log('ESOOOOO')
    }
  }, [clickedCard]); */