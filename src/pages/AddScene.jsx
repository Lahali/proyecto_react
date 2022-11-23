import { isDisabled } from "@testing-library/user-event/dist/utils";
import { collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom"; // esto para importar "props" con Link
import CloudinaryWidget from "../components/CloudinaryWidget";
import { database } from "../components/firebase/firebaseConfig";
import Navbar from "../components/Navbar";
import SearchMovie from "../components/SearchMovie";

export default function AddScene() {

  const location = useLocation();
  const { latlng } = location.state; //hay problemas con esto si al dar al boton cambia la url

  // state para luego poner en la escena. Demasiado lio hacer un state solo como que es un objecto anidado
  const [coordinates, setCoordinates] = useState([latlng.lat, latlng.lng]);
  const [movieSelected, setsetMovieSelected] = useState(); // desde este sacamos titulo peli y ID
  const [sceneTitle, setSceneTitle] = useState("");
  const [sceneDescription, setSceneDescription] = useState("");
  const [url, updateUrl] = useState();
  // por el componente SearchMovie
  const [moviesResults, setMoviesResults] = useState([]);
  const [userSearch, setUserSearch] = useState(""); // lo que vamos tecleando en el input

  const [sceneToUpload, setSceneToUpload] = useState();
  

  const handleChangeSceneTitle = (e) => {
    setSceneTitle(e.target.value);
  };
  const handleChangeSceneDescription = (e) => {
    setSceneDescription(e.target.value);
  };

  const handleSubmit = () => {
    // if (url === undefined || sceneTitle.length<1 || movieSelected === undefined || sceneDescription<1 || url===undefined){
    //   console.log('MANCANO DATI')
    //   return;
    // }

    setSceneToUpload({
      type: "Feature",
      properties: {
        img: url,
        scene_title: sceneTitle,
        scene_description: sceneDescription,
        position: "",
        scene_ID: "esto lo borramos?", // el id lo pone ya firebase en automatico?
        imdb_movie_ID: "",
        TMDB_ID: movieSelected.id,
        movie_title: movieSelected.title,
      },
      geometry: {
        coordinates: coordinates,
        type: "Point",
      },
    });
    setSceneTitle("");
    setSceneDescription("");
    setUserSearch("");
  };

  const scenesRef = collection(database, "scenes");
  useEffect(() => {
    sceneToUpload && addDoc(scenesRef, sceneToUpload);
  }, [sceneToUpload]);

const  botonEnviarStyle =() => {
if (url === undefined || sceneTitle.length<1 || movieSelected === undefined || sceneDescription<1) {
  return "btn-disabled"
} else {
  return
}
}

console.log('coordinates:', coordinates)
console.log('movieSelected:', movieSelected)
console.log('sceneTitle:', sceneTitle)
console.log('sceneDescription:', sceneDescription)
console.log('url:', url)
console.log('sceneToUpload:', sceneToUpload)

  return (
    <>
      <Navbar />
      {/* <div className="bg-base-200 flex items-center justify-center"> */}
      {/* <div className="grid grid-rows-4 h-screen p-3 bg-base-100 mx-6 my-4 rounded-lg max-h-[47rem]"> */}
      <div className="flex flex-col h-screen p-3 bg-base-100 mx-6 my-4 rounded-lg max-h-[47rem]">
        <div className="flex flex-col items-center">
          <SearchMovie
            moviesResults={moviesResults}
            setMoviesResults={setMoviesResults}
            userSearch={userSearch}
            setUserSearch={setUserSearch}
            movieSelected={movieSelected}
            setsetMovieSelected={setsetMovieSelected}
          />
          <div className="w-80 ml-2 mt-3">
            <label className="label">
              <span className="label-text text-base">Titula la escena:</span>
            </label>
          </div>
          <input
            className="input input-bordered w-80 h-10 bg-white mx-2"
            type="text"
            onChange={handleChangeSceneTitle}
          />
        </div>

        <div className="flex flex-col items-center content-center mt-2">
          <div className="w-80 ml-2">
            <label className="label">
              <span className="label-text text-base">... y escribe algo</span>
            </label>
          </div>
          <textarea
            className="rounded-3xl border p-3 mt-1 w-80"
            rows="10"
            placeholder="escribe algo aqui"
            onChange={handleChangeSceneDescription}
          />
        </div>
        <div className="flex flex-col items-center self-center">
          <CloudinaryWidget url={url} updateUrl={updateUrl} />
        </div>
        <div className="flex flex-col items-center self-center">
          <label>
            {/* <input type="button" onClick={console.log('scene:::', scene)}/> */}
            {/* si aqui no pongo type='button' se comporta como un submit */}
            <button
              className={`${botonEnviarStyle()} btn w-80 btn-primary mt-5 `}
              type="button"
              onClick={handleSubmit}
            >
              ENVIAR
            </button>
          </label>
              {/* <div className="alert alert-warning shadow-lg">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <span>compila todos los campos y sube una imagen!</span>
                </div>
              </div> */}
        </div>
      </div>

    </>
  )
}

// ejemplo de objecto escena que hay que subir:

/* const escena_para_agregar = {
    "type": "Feature",
    "properties": {
        "img":"./data/img/99.jpg",
        "escena": "juega a la playstation",
        "lugar": "Barcelona"
    },
    "geometry": {
        "coordinates": [
            2.0,
            41.0
        ],
        "type": "Point"
    }
} */
/* {
    "type": "Feature",
    "properties": {
        "img":"",
        "escena": "", // habria que cambiarlo por titulo escena
        "sceneDescription": "",
        "lugar": ""
    },
    "geometry": {
        "coordinates": latlng,
        "type": "Point"
    }
} */

// actualizar el State de objectos anidados es un poco complicado...
/* function handleChange(e) {    
    console.log("event target:" ,e.target)
    setScene(prev =>{
        return{
            ...prev,
            [e.target.name]: e.target.value
        }
    })
} */

//window.history.replaceState({}, document.title) // esto sirve a no tener problemas co el useLocation al refrescar la pagina
