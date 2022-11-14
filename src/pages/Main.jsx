import { useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import { useLocation } from 'react-router-dom' // esto para importar "props" con Link
import Map from '../components/Map';

export default function Main() {

  const location = useLocation()
  const { scenes } = location.state;
  const [movie, setMovie] = useState(scenes); // guardamo en un State los datos mandados dentro de Link
  const [map, setMap] = useState(null);

  const [currentMarker, setCurrentMarker] = useState({}); // el marker actualmente seleccionado
  //console.log('currentMarker::', currentMarker);
  
  return (
    <>
      <Navbar
      />
      <div className="mainContainer">

        <Map
        map={map}
        setMap={setMap}
        movie={movie}
        currentMarker={currentMarker}
        setCurrentMarker={setCurrentMarker}
        />

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