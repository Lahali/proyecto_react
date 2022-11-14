import { getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddMovieFirebase from "../components/AddMovieFirebase";
import { scenesRef } from "../components/firebase/firebaseConfig"
// import peliculas from "../data/peliculas.json"; // el archivo con el array de peliculas

export default function HomeWithScenes(props) {

  const [filteredTitle, setFilteredTitle] = useState("");
  const [moviesFromScenes, setMoviesFromScenes] = useState([])
  // const [peliculas, setPeliculas] = useState([]) cambiamos peliculas por scenes
  const [scenes, setScenes] = useState([])

  // con este useEffect guardamos todo el database de Firestore en el useState 'peliculas'
  useEffect(()=>{
    let scenes = [];
    getDocs(scenesRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        scenes.push({ ...doc.data() }) // si queremos tambien el ID: movies.push({ ...doc.data(), id: doc.id })
        setScenes(scenes)
      console.log("useEffect!!!")
      })
    })
    .catch(err =>{
      console.log(err.message)
    })
  }, []) // se puede poner como dependencia que un usuario haya agregado una escena


// devuelve los titulos de peliculas a partir de las escena
useEffect(()=>{
let movieList = [];
let sceneslength = scenes.length;
for (let i=0; i<sceneslength;i++) {
  if (movieList.includes(scenes[i].properties.movie_title)) {
    console.log('hola')
  } else {
    movieList.push(scenes[i].properties.movie_title);
  }
}
setMoviesFromScenes(movieList);
}, [scenes])
/*   // todas las escenas de todas las pelis
  let allMoviesScenes = () => {
    let movieLength = peliculas.length;
    let movieFeatures = [];
    for (let i = 0; i < movieLength; i++) {
      movieFeatures.push(...peliculas[i].features);
    }
    // console.log('features:::,', movieFeatures)
    return {
      title: "TODAS LAS PELIS",
      features: movieFeatures,
    };
  }; */

  
  const handleChange = (e) => {
    setFilteredTitle(() => e.target.value);
  };

  // titleMovieList 
  // let titleMovieList = [];
  // scenes.forEach

  // por cada pelicula del DB creamos un Link que manda al mapa con los marker de las escenas
  // esto viene filtrado segun el State filteredTitle
  let sceneList = []; // es mejor hacer así o llamar directamente a una funcion como allMoviesScenes???
  scenes.forEach((scene) => {
    if (
      scene.properties.scene_title.toLowerCase().indexOf(filteredTitle.toLowerCase()) === -1
    ) {
      return;
    } else {
      sceneList.push(
        <li className="link link-hover m-5" key={scene.properties.scene_title}>
          <Link to="/main" state={{ film: scene }}> 
            {scene.properties.scene_title}
          </Link>
        </li>
      );
    }
  });

console.log("scenes::", scenes)
console.log("moviesFromScenes::", moviesFromScenes)

  return (
    <>
    {/* <Navbar/> */}
    <div className="flex-col items-center p-3 ">
      <h1 className="text-3xl m-3">Esta es la Home</h1>
      <div className="">
        <Link  to="/main" state={{ scenes: scenes }}>
         <button className="btn btn-outline btn-primary w-60">
           Todas las peliculas
          </button>
        </Link>
        <p className="m-3">Busca en nuestro archivo de {scenes.length} escenas!</p>
        <input
          className="input input-bordered w-60 max-w-xs mt-2"
          type="text"
          placeholder="search..."
          value={filteredTitle}
          onChange={handleChange}
        ></input>
      </div>
      <ul className="list-none text-xl">
        {sceneList}
      </ul>
    </div>
    </>
  );
}
