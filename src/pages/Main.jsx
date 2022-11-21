import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Box from "../components/Box";
import { useLocation, useParams } from "react-router-dom"; // esto para importar "props" con Link
import Map from "../components/Map";
import { useGetData } from "../components/context/MoviesProvider";
import * as L from "leaflet";


export default function Main() {
  const { scenes } = useGetData();
  const [arrayScenes, setArrayScenes] = useState(); // guardamo en un State los datos mandados dentro de Link
  const [map, setMap] = useState(null);
  const [currentMarker, setCurrentMarker] = useState({}); // el marker actualmente seleccionado
  const [boxPosition, setBoxPosition] = useState("isHidden");

  const [triangulation, setTriangulation] = useState() // aqui el centro y nivel de zoom

  // AQUÍ RECOGEMOS LAS ESCENAS FILTRANDO EL ID DE LA RUTA
  const { id } = useParams();


  const filtered = () => {

    // ==> AQUÍ HAY QUE MIRAR QUE EL TMDB_ID PASARLO A NUMBER
    const scenesFiltered = scenes.filter((scene) => scene.properties.TMDB_ID === parseInt(id))

    if(!id) {
      return setArrayScenes(scenes)
    } else {
      return setArrayScenes(scenesFiltered)
    }
  };


  
  useEffect(() => {
    filtered()
  }, []);


  function fTriangulation() {
    if (arrayScenes) {
      let myPoints = arrayScenes.map(scene=>{
      return scene.geometry.coordinates
    })
    console.log('myPoints,', myPoints)
    let myBounds = new L.LatLngBounds(myPoints);
    console.log('myBounds,', myBounds)
    setTriangulation(myBounds);
  }}

useEffect(()=>{
  fTriangulation();
}, [arrayScenes])

  return (
    <div className="mainContainer">
      <Navbar />

      <div className="mapAndBoxContainer">
        <Map
          map={map}
          setMap={setMap}
          arrayScenes={arrayScenes}
          currentMarker={currentMarker}
          setCurrentMarker={setCurrentMarker}
          triangulation={triangulation}
        />

        <Box // esta es la card que sube desde abajao "estilo Google Maps"
          arrayScenes={arrayScenes}
          currentMarker={currentMarker}
          setCurrentMarker={setCurrentMarker}
          boxPosition={boxPosition}
          setBoxPosition={setBoxPosition}
          map={map}
        />
      </div>
    </div>
  );
}
