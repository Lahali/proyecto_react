import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetData } from "../components/context/MoviesProvider";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
import iconoMapa from "../icon/iconoMapaDark.svg";
// import peliculas from "../data/peliculas.json"; // el archivo con el array de peliculas
import travolta from "../icon/travolta.gif"


export default function Home(props) {
  const [searchField, setSearchField] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const { moviesData, scenes } = useGetData();

  //  ==> ESTO ES PARA FORZAR AL COMPONENTE A RENDERIZARSE. ES UNA SOLUCIÓN TEMPORAL AL BUG DE LA RECARGA
  // buscar xq el componente no es reactivo, hay un fallo de renderización
  const [pepe, setPepe] = useState("");
  useEffect(() => {
    setTimeout(() => setPepe("pepe"), 3000);
  });

  // LÓGICA DEL BUSCADOR
  // ==> ESTAMOS USÁNDOLO???
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

  // BUSCADOR NUEVO, NOS AVISA SI NO HAY NINGUNA CORRESPONDENCIA
  const displayResults = () => {
    if (moviesData.length == 0) {
      return (
        <div className="btn btn-block loading h-full bg-transparent border-none"></div>
      );
    } else if (filteredMovies.length === 0 && searchField.length > 0) {
      return (
        <div>
        <img src={travolta} />

        </div>
      );
    } else if (filteredMovies.length > 0) {
      return filteredMovies.map((movie, index) => {
        return (
          <MovieCard
            key={index}
            getMovieTitle={movie.title}
            getMoviePoster={movie.poster}
            movieId={movie.id}
            getMovieRating={movie.rating}
          />
        );
      });
    } else {
      return moviesData.map((movie, index) => {
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
      });
    }
  };

  return (
    <>
      {/* ESTE DIV FUERA HACE QUE NO HAYA PROBLEMAS CON EL STICKY BUTTON */}
      <div className="homeBackground relative flex-col items-center bg-scroll">
        <Navbar />
        <div className="p-3 h-fit">
          <h1 className="text-3xl m-3 text-gray-400">Esta es la Home</h1>
          <p className="m-3 text-gray-400">
            Busca en nuestro archivo, ya tenemos {scenes.length} escenas y{" "}
            {moviesData.length} películas!
          </p>
          <div
            className="flex flex-col justify-center items-center
          lg:flex-row lg:justify-around 
          md:flex-row md:justify-evenly"
          >
            <input
              className="input input-bordered w-[342px] lg:w-[366px] text-center my-2 md:w-60"
              type="text"
              placeholder="busca las películas ya registradas"
              value={searchField}
              onChange={handleChange}
            ></input>
            <Link to="/main/">
              <button
                className="hidden 
               md:w-60 md:btn md:btn-outline md:btn-accent-focus md:my-3
               lg:btn lg:btn-outline lg:btn-accent-focus lg:w-[366px] lg:my-3"
              >
                Ver todas las peliculas y escenas
              </button>
            </Link>
            <Link to="/main/">
              <button className="btn btn-secondary w-[342px] mt-1 lg:w-[366px] md:w-60">
                Añade una película o escena
              </button>
            </Link>
            {/* RESULTADOS BUSCADOR */}
          </div>
          <div
            className="relative mt-5 max-h-screen rounded-lg
         lg:flex-wrap lg:flex lg:justify-center lg:items-center"
          >
            {displayResults()}
            {/* PARA QUE FUNCIONE EL STICKY, TIENE QUE ESTAR DENTRO DE UN DIV RELATIVE*/}
            <Link to="/main/">
              <button className="lg:hidden md:hidden flex flex-col justify-center items-center p-3 sticky bottom-5 left-80 btn btn-accent h-auto w-fit my-3">
                Ir al mapa
                <img src={iconoMapa} className="h-8 m-2" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
