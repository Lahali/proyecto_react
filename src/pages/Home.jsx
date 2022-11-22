import { itMatchesOne } from "daisyui/src/lib/postcss-prefixer/utils";
import { getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddMovieFirebase from "../components/AddMovieFirebase";
import { useGetData } from "../components/context/MoviesProvider";
import { scenesRef } from "../components/firebase/firebaseConfig";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
// import peliculas from "../data/peliculas.json"; // el archivo con el array de peliculas

export default function Home(props) {
  const [searchField, setSearchField] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const { moviesData, scenes  } = useGetData();

  const [repeated, setRepeated] = useState(0)

const [pepe, setPepe] = useState("");


  scenes.sort((a, b) => {
        return a.properties.TMDB_ID - b.properties.TMDB_ID
      })



  // LÓGICA DEL BUSCADOR
  const getFilter = (searchField) => {
    const resultFilter = moviesData.filter((item) => {
      if (item.title.toLowerCase().includes(searchField.toLowerCase())) {
        return item;
      }
    });
    setFilteredMovies(resultFilter);
  };
 

  const handleChange = (e) => {
    setSearchField(e.target.value);
    getFilter(e.target.value);
  };

  //  ==> ESTO ES PARA FORZAR AL COMPONENTE A RENDERIZARSE. ES UNA SOLUCIÓN TEMPORAL AL BUG DE LA RECARGA
  useEffect(() => {
    setTimeout(() => setPepe("pepe"), 1000);
  });

  // buscar xq el componente no es reactivo, hay un fallo de renderización
  return (
    <>
      <Navbar />
      <div className="flex-col items-center p-3 ">
        <h1 className="text-3xl m-3">Esta es la Home</h1>
          <p className="m-3">
            Busca en nuestro archivo, ya tenemos {scenes.length} escenas y {moviesData.length} películas!
          </p>
        <div className="flex flex-col justify-center items-center">
          <input
            className="input input-bordered w-[315px] max-w-xs my-2"
            type="text"
            placeholder="search..."
            value={searchField}
            onChange={handleChange}
          ></input>
          <Link to="/main/">
            <button className="btn btn-outline btn-primary w-[315px] my-3">
              Ver todas las peliculas y escenas
            </button>
          </Link>
          <Link to="/main/">
            <button className="btn btn-outline w-[315px] mt-1">
              Añade una película o escena
            </button>
          </Link>
        {/* RESULTADOS BUSCADOR */}
        </div>
        <div className="mt-5 max-h-[24rem] overflow-scroll md:max-h-[45rem] lg:max-h-[40rem] bg-base-200 rounded-lg">

        {filteredMovies.length > 0
          ? filteredMovies.map((movie, index) => {
              return (
                <MovieCard
                  key={index}
                  getMovieTitle={movie.title}
                  getMoviePoster={movie.poster}
                  movieId={movie.id}
                  getMovieRating={movie.rating}

                  />
                  );
                })
                : moviesData.map((movie, index) => {
                  return (
                    <MovieCard
                    key={index}
                    getMovieTitle={movie.title}
                    getMoviePoster={movie.poster}
                    getMovieScenes={movie.scenes}
                    movieId={movie.id}
                    getMovieRating={movie.rating}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
