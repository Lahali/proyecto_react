import { getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { moviesRef } from "../components/firebase/firebaseConfig"
// import peliculas from "../data/peliculas.json"; // el archivo con el array de peliculas

export default function Home(props) {
  const [filteredTitle, setFilteredTitle] = useState("");

  const [peliculas, setPeliculas] = useState([])

  // con este useEffect guardamos todo el database de Firestore en el useState 'peliculas'
  useEffect(()=>{
    let movies = [];
    getDocs(moviesRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        movies.push({ ...doc.data() }) // si queremos tambien el ID: movies.push({ ...doc.data(), id: doc.id })
      setPeliculas(movies)
      console.log("useEffect!!!")
      })
    })
    .catch(err =>{
      console.log(err.message)
    })
  }, []) // se puede poner como dependencia que un usuario haya agregado una escena








  // todas las escenas de todas las pelis
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
  };

  const handleChange = (e) => {
    setFilteredTitle(() => e.target.value);
  };

  // por cada pelicula del DB creamos un Link que manda al mapa con los marker de las escenas
  // esto viene filtrado segun el State filteredTitle
  let moviesList = []; // es mejor hacer así o llamar directamente a una funcion como allMoviesScenes???
  peliculas.forEach((pelicula) => {
    if (
      pelicula.title.toLowerCase().indexOf(filteredTitle.toLowerCase()) === -1
    ) {
      return;
    } else {
      moviesList.push(
        <li className="link link-hover m-5" key={pelicula.title}>
          {/* esto es una prop desde el link */}
          <Link to="/main" state={{ film: pelicula }}> 
            {pelicula.title}
          </Link>
        </li>
      );
    }
  });

  return (
    <>
    {/* <Navbar/> */}
    <div className="flex-col items-center p-3 ">
      <h1 className="text-3xl m-3">Esta es la Home</h1>
      <div className="">
        <Link  to="/main" state={{ film: allMoviesScenes() }}>
         <button className="btn btn-outline btn-primary w-60">
           Todas las peliculas
          </button>
        </Link>
        <p className="m-3">Busca en nuestro archivo de {peliculas.length} peliculas!</p>
        <input
          className="input input-bordered w-60 max-w-xs mt-2"
          type="text"
          placeholder="search..."
          value={filteredTitle}
          onChange={handleChange}
        ></input>
      </div>
      <ul className="list-none text-xl">
        {moviesList}
      </ul>
    </div>
    </>
  );
}
