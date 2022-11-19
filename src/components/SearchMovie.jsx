import PreviousMap from "postcss/lib/previous-map";
import { useState } from "react";
import { useEffect } from "react";

export default function SearchMovie(props) {
  const url = "https://api.themoviedb.org/3/";
  const APIkey = process.env.REACT_APP_API_KEY_TMDB;
  const language = "&language=es-ES";
  const externalSource = "&external_source=imdb_id";
  
  const [openSearch, setOpenSearch] = useState(false)

  // ejemplo que te devuelve peli a partir de IMDB_ID tt0230600
  // /useEffect(() => {
  //     fetch(`${url}find/tt0230600?api_key=${APIkey}${language}${externalSource}`)
  //       .then(res => res.json())
  //       .then(data => console.log('TMDB data: ', data))
  //   }, [])

  useEffect(() => {
    fetch(
      `${url}search/movie?api_key=${APIkey}&query=${props.userSearch}&page=1${language}`
    )
      .then((res) => res.json())
      .then((data) => {
        props.setMoviesResults(data.results);
        console.log("DATA! ", data.results); // guardar titulo, ID
      });
  }, [props.userSearch]);

  const handleChange = (e) =>{
    props.setUserSearch(e.target.value);
    // ESTO HACE QUE EL BUSCADOR SÓLO SEA VISIBLE SI HAY ALGÚN VALOR
    setOpenSearch(!openSearch)
  } 

  return (
    <>
      <div className="relative">
        <label>Busca la peli: </label>
        <input
          className="input input-bordered w-50 max-w-xs my-2 h-10 bg-white mx-2"
          type="text"
          onChange={handleChange}
          disabled={props.movieSelected}
          /* mientras tecleo me enseña lo que tecleo, si escojo una peli me enseña solo esa */
          value={
            props.movieSelected ? props.movieSelected.title : props.userSearch
          }
        />

        {/* MENÚ DROPDOWN DE BÚSQUEDA el secreto es la combinación relative-absolute!*/}
        {/* el listado lo enseño solo si hay los resultado y aun no he elegido un titulo.
            Faltaria agregar el boton 'cambiar' */}
          <div className={`${openSearch ? "" : "hidden"} absolute bg-white w-full rounded-lg p-4 shadow`}>
          {props.moviesResults &&
            !props.movieSelected &&
            props.moviesResults.map((movie) => {
              return (
                // <div className="absolute bg-white h-96">
                  <ul className="space-y-4">
                    <li
                      onClick={() => props.setsetMovieSelected(movie)}
                    >
                      {movie.title}
                    </li>
                  </ul>
              );
            })}
        </div>
      </div>
    </>
  );
}
