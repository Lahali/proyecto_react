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
  const { moviesData, scenes, setMoviesData } = useGetData();

  const [pepe, setPepe] = useState("");

  
  // const maybeitworks = () => {
  //   moviesData.map((movie, index) =>
  //   movie[index].id === movie[index + 1].id
  //   ? setMoviesData([{ ...moviesData, scenes: +1 }])
  //   : ""
  //   );
  // };
  // moviesData.sort((a, b) => {
  //   return a.id - b.id;
  // });
  


  console.log("qué estamos haciendo", moviesData)


  // LÓGICA DEL BUSCADOR
  const getFilter = (searchField) => {
    const resultFilter = moviesData.filter((item) => {
      if (item.title.toLowerCase().includes(searchField.toLowerCase())) {
        return item;
      }
    });
    setFilteredMovies(resultFilter);
  };
  console.log(filteredMovies);

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
        <div className="">
          <Link to="/main/">
            <button className="btn btn-outline btn-primary w-60">
              Todas las peliculas
            </button>
          </Link>
          <p className="m-3">
            Busca en nuestro archivo de {scenes.length} escenas!
          </p>
          <input
            className="input input-bordered w-60 max-w-xs my-2"
            type="text"
            placeholder="search..."
            value={searchField}
            onChange={handleChange}
          ></input>
        </div>
        {/* RESULTADOS BUSCADOR */}
        {filteredMovies.length > 0
          ? filteredMovies.map((movie, index) => {
              return (
                <MovieCard
                  key={index}
                  getMovieTitle={movie.title}
                  getMoviePoster={movie.poster}
                  movieId={movie.id}
                  />
                  );
                })
                : moviesData.map((movie, index) => {
                  return (
                    <MovieCard
                    key={index}
                    getMovieTitle={movie.title}
                    getMoviePoster={movie.poster}
                    getMovieDate={movie.date}
                />
              );
            })}
      </div>
    </>
  );
}
