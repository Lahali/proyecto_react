import { useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { useLocation, useParams } from "react-router-dom"; // esto para importar "props" con Link
import Map from "../components/Map";
import { useGetData } from "../components/context/MoviesProvider";
import { useEffect } from "react";

export default function Main() {
  const { scenes } = useGetData();
  const [arrayScenes, setArrayScenes] = useState(scenes); // guardamo en un State los datos mandados dentro de Link
  const [map, setMap] = useState(null);
  const [currentMarker, setCurrentMarker] = useState({}); // el marker actualmente seleccionado
  console.log("currentMarker (MAIN):", currentMarker);

  // AQUÍ RECOGEMOS LAS ESCENAS FILTRANDO EL ID DE LA RUTA
  const { id } = useParams();

  const filtered = () => {
    const scenesFiltered = scenes.filter((movie) => movie.properties.TMDB_ID === id)
    if(!id) {
      return setArrayScenes(scenes)
    } else {
      return setArrayScenes(scenesFiltered)
    }
  };

  
  useEffect(() => {
    filtered()
  }, []);



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
  );
}
