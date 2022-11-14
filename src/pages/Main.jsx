import { useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import { useLocation, useParams } from 'react-router-dom' // esto para importar "props" con Link
import Map from '../components/Map';

export default function Main() {

  const location = useLocation()
  const { scenes } = location.state;
  const [arrayScenes, setMovie] = useState(scenes); // guardamo en un State los datos mandados dentro de Link

  // const { film } = location.state;
  // const {film} = useParams()

  const [map, setMap] = useState(null);

  const [currentMarker, setCurrentMarker] = useState({}); // el marker actualmente seleccionado
  console.log('currentMarker (MAIN):', currentMarker);
  
  return (
    <>
      <Navbar />

      <div className="mainContainer">

        <Map
        map={map}
        setMap={setMap}
        arrayScenes={arrayScenes}
        currentMarker={currentMarker}
        setCurrentMarker={setCurrentMarker}
        />

        <Card // esta es la card que sube desde abajao "estilo Google Maps"
          arrayScenes={arrayScenes}
          currentMarker={currentMarker}
          setCurrentMarker={setCurrentMarker}
          map={map}
        />

      </div>
    </>
  )
}