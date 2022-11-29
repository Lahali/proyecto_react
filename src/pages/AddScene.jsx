import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
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
  const [url, updateUrl] = useState("");
  // por el componente SearchMovie
  const [moviesResults, setMoviesResults] = useState([]);
  const [userSearch, setUserSearch] = useState(""); // lo que vamos tecleando en el input

  const scenesRef = collection(database, "scenes");
  // const [sceneToUpload, setSceneToUpload] = useState();

  const [checkModal, setCheckModal] = useState(false);

  const handleChangeSceneTitle = (e) => {
    setSceneTitle(e.target.value);
  };
  const handleChangeSceneDescription = (e) => {
    setSceneDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hola?");
    const scene = {
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
    };
    addDoc(scenesRef, scene);
    console.log("SCENA SUBIDA");
    // window.location.href = "#my-modal-2";
    setCheckModal(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-gray-900 overflow-hidden">
        <Navbar />
        <div className="flex flex-col h-screen p-3 mx-6 my-4 rounded-lg max-h-[47rem]">
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
                <span className="label-text text-gray-400 text-base">
                  Titula la escena:
                </span>
              </label>
            </div>
            <input
              className="input input-bordered bg-gray-800 w-80 h-10 mx-2 text-gray-400 text-base"
              type="text"
              onChange={handleChangeSceneTitle}
              required
            />
          </div>

          <div className="flex flex-col items-center content-center mt-2">
            <div className="w-80 ml-2">
              <label className="label">
                <span className="label-text text-gray-400 text-base">
                  ... y escribe algo
                </span>
              </label>
            </div>
            <textarea
              className="rounded-lg bg-gray-800 border-gray-600 border  p-3 mt-1 w-80 text-gray-400 text-base focus:border-violet-500 selection:border-violet-500 hover:border-violet-500 active:border-violet-500"
              rows="10"
              placeholder="escribe algo aqui"
              onChange={handleChangeSceneDescription}
              required
            />
          </div>
          <div className="flex flex-col items-center self-center mt-3">
            <CloudinaryWidget url={url} updateUrl={updateUrl} />
          </div>
          <div className="flex flex-col items-center self-center mt-7">
            <label>
              <button className="btn w-80 btn-secondary">ENVIAR</button>
            </label>
          </div>
        </div>
      </form>

      {/* M O D A L */}
      <input
        type="checkbox"
        checked={checkModal}
        id="my-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-gray-400 text-lg">Gracias!</h3>
          <p className="py-4 text-base text-gray-400">
            Tu película se ha subido currectamente!!
          </p>
          <div className="modal-action">
            <Link to="/main" className="link link-secondary">
              VOLVER
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
