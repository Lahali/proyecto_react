import { MapContainer, Map, TileLayer, useMapEvents, useMap, Marker, Popup, Polygon, Tooltip, GeoJSON } from 'react-leaflet'
import { useEffect, useRef, useState } from 'react';
import DisplayMarkers from './DisplayMarkers';
import Navbar from './Navbar';
import Card from './Card';
import { useLocation } from 'react-router-dom' // esto para importar "props" con Link
import NewMarker from './NewMarker'


export default function Main() {

  const [newMarkerPosition, setNweMarkerPosition] = useState();

  const location = useLocation()
  const { film } = location.state;
  const [movie, setMovie] = useState(film); // guardamo en un State los datos mandados por el state dentro de Link
  //console.log("MOVIE:::", movie)
  const [map, setMap] = useState(null);

  const [currentMarker, setCurrentMarker] = useState({});

  const mapURL = 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
  const attrib = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  const mapURL3 = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  const mapURL2 = 'https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png' // serve token

  return (
    <>
      <Navbar
        title={movie.title}
      />

      <div className="mainContainer">

        <div className='mapContainer'>
          <MapContainer
            // whenCreated={setMap} esta era la forma antigua de hacerlo
            ref={setMap}
            center={[41.4, 2.17]}
            zoom={12}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution={attrib}
              url={mapURL}
            />

            <NewMarker
              newMarkerPosition={newMarkerPosition}
              setNweMarkerPosition={setNweMarkerPosition}
              map={map}
            />

            <DisplayMarkers
              title={movie.title}
              movieFeatures={movie.features}
              currentMarker={currentMarker}
              setCurrentMarker={setCurrentMarker}
            />
          </MapContainer  >
        </div>

        <Card
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