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
    if(!id) {
      setArrayScenes(scenes)
    } else {
      const scenesFiltered = scenes.filter((scene) => scene.properties.TMDB_ID === parseInt(id))
      setArrayScenes(scenesFiltered)
    }
  };
  
  useEffect(() => {
    filtered()
  }, [scenes], [id]);

  function fTriangulation() {
    console.log('TRIANGULATION')
    if (!id) {
      let myBounds = new L.LatLngBounds([[41.355,-4],[43,2.2]]);
      setTriangulation(myBounds);
    }
    else if (arrayScenes && arrayScenes.length>0) {
    // else {
      let myPoints = arrayScenes.map(scene=>{
        return scene.geometry.coordinates
      })
    let myBounds = new L.LatLngBounds(myPoints);
    setTriangulation(myBounds);
  }}

useEffect(()=>{
  fTriangulation();
}, [arrayScenes])


  return (
    <>
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
    
    </> 
    
  );
}
