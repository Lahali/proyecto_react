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

  const [sceneToUpload, setSceneToUpload] = useState();

  // por el componente SearchMovie
  const [moviesResults, setMoviesResults] = useState([]);
  const [userSearch, setUserSearch] = useState(""); // lo que vamos tecleando en el input

  const handleChangeSceneTitle = (e) => {
    setSceneTitle(e.target.value);
  };
  const handleChangeSceneDescription = (e) => {
    setSceneDescription(e.target.value);
  };

  const handleSubmit = () => {
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
  };

  const scenesRef = collection(database, "scenes");
  useEffect(() => {
    sceneToUpload && addDoc(scenesRef, sceneToUpload);
    console.log("ESCENA SUBIDA!!!");
  }, [sceneToUpload]);

  console.log("movieSelected:", movieSelected);
  console.log("coordinates:", coordinates);

  console.log("sceneToUpload:", sceneToUpload);

  return (
    <>
      <Navbar />
      <div className="grid grid-rows-5 h-screen p-3">
        <div>
          <SearchMovie
            moviesResults={moviesResults}
            setMoviesResults={setMoviesResults}
            userSearch={userSearch}
            setUserSearch={setUserSearch}
            movieSelected={movieSelected}
            setsetMovieSelected={setsetMovieSelected}
          />

          <label className="label">
            Titula la escena:
            <input
              className="input input-bordered w-50 max-w-xs my-2 h-10 bg-white mx-2"
              type="text"
              onChange={handleChangeSceneTitle}
            />
          </label>
        </div>

        <div>
          <label className="label">
            ...y escribe algo
            <textarea
              className="rounded-xl border p-3"
              rows="4"
              cols="30"
              placeholder="escribe algo aqui"
              onChange={handleChangeSceneDescription}
            />
          </label>
        </div>

        <CloudinaryWidget url={url} updateUrl={updateUrl} />
        {/* DIV VACÍO */}
        <div></div>

        <div>
          <label>
            {/* <input type="button" onClick={console.log('scene:::', scene)}/> */}
            {/* si aqui no pongo type='button' se comporta como un submit */}
            <button
              className="btn btn-outline btn-primary w-60 mt-5"
              type="button"
              onClick={handleSubmit}
            >
              SUBMIT
            </button>
          </label>
        </div>
      </div>
    </>
  );
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
