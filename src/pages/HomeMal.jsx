import { getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { moviesRef } from "../components/firebase/firebaseConfig";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
// import movies from "../data/movies.json"; // el archivo con el array de movies

export default function Home(props) {
  const [filteredTitle, setFilteredTitle] = useState("");
  const [movies, setmovies] = useState([]);
  const [searchField, setSearchField] = useState("");


  useEffect(() => {
    getMovieList();
    console.log("palículas", moviesList)
  }, []);

  const getMovieList = () => {
    getDocs(moviesRef)
    .then((response) => {
        const moviesList = response.docs.map((doc) => doc.data());
        setmovies(moviesList);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    allMoviesScenes()
  }, [])


  // todas las escenas de todas las pelis
  const allMoviesScenes = () => {
    let movieLength = movies.length;
    let movieFeatures = [];
    for (let i = 0; i < movieLength; i++) {
      movieFeatures.push(...movies[i].features);
    }
    console.log("features:::,", movieFeatures);
    return {
      title: "TODAS LAS PELIS",
      features: movieFeatures,
    };
  };

  const handleChange = (e) => {
    setSearchField(e.target.value);
    console.log(filteredMovies)
  };

  // buscador
  const filteredMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().startsWith(searchField.toLowerCase());
  });
  

  // por cada pelicula del DB creamos un Link que manda al mapa con los marker de las escenas
  // esto viene filtrado segun el State filteredTitle
  let moviesList = []; // es mejor hacer así o llamar directamente a una funcion como allMoviesScenes???
  // movies.forEach((movie) => {
  // if (movie.title.toLowerCase().indexOf(filteredTitle.toLowerCase()) === -1) {
  // return;
  // } else {
  // moviesList.push(
  // <li className="link link-hover m-5" key={movie.title}>
  {
    /* esto es una prop desde el link */
  }
  {
    /* <Link to="/main" state={{ film: movie }}> */
  }
  {
    /* <Link to='/main'> */
  }
  {
    /* {movie.title}
          </Link>
        </li>
      );
    }
  }); */
  }

  return (
    <>
      <Navbar
        movies={movies}
        filteredMovies={filteredMovies}
        handleChange={handleChange}
        getMovieList={getMovieList}
      />
      <div className="flex-col items-center p-3 ">
        <h1 className="text-3xl m-3">Esta es la Home</h1>
        <div className="">
          <Link to="/main" state={{ film: allMoviesScenes() }}>
            <button className="btn btn-outline btn-primary w-60">
              Todas las movies
            </button>
          </Link>
          <p className="m-3">
            Busca en nuestro archivo de {movies.length} movies!
          </p>
          <input
            className="input input-bordered w-60 max-w-xs mt-2"
            type="text"
            placeholder="search..."
            value={filteredMovies}
            onChange={handleChange}
          />
        </div>
        <ul className="list-none text-xl">
          {filteredMovies.length > 0
            ? filteredMovies.map((movie) => (
                <MovieCard 
                key={movie.scene}
                getMovieTitle={movie.scene}/>
              
              ))
            : movies.map((movie) => (
              <MovieCard 
              key={movie.scene}
              getMovieTitle={movie.scene}/>
            
              ))}
        </ul>
      </div>
    </>
  );
}
