import PreviousMap from "postcss/lib/previous-map";
import { useState } from "react";
import { useEffect } from "react";

export default function SearchMovie(props) {
  const url = "https://api.themoviedb.org/3/";
  const APIkey = process.env.REACT_APP_API_KEY_TMDB;
  const language = "&language=es-ES";
  // ==> ESTO LO ESTÁ USANDO ALGUIEN??
  const externalSource = "&external_source=imdb_id";
  const [openSearch, setOpenSearch] = useState(false);

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
      });
  }, [props.userSearch]);

  const handleChange = (e) => {
    props.setUserSearch(e.target.value);
    setOpenSearch(true)
  };


  return (
    <>
      <div>
        <div className="w-80 ml-2 mt-3">

        <label className="label">
          <span className="label-text text-base">Busca la peli:</span>
          </label>
        </div>
          <input
            className="input input-bordered w-80 my-2 h-10 mx-2"
            type="text"
            onChange={handleChange}
            disabled={props.movieSelected}
            required
            /* mientras tecleo me enseña lo que tecleo, si escojo una peli me enseña solo esa */
            value={
              props.movieSelected ? props.movieSelected.title : props.userSearch
            }
          />

        {/* MENÚ DROPDOWN DE BÚSQUEDA el secreto es la combinación relative-absolute!*/}
        {/* el listado lo enseño solo si hay los resultado y aun no he elegido un titulo.
            Faltaria agregar el boton 'cambiar' */}
        <div className="relative flex flex-col items-center">
          <div
            className={`${
              openSearch ? "" : "hidden"
            } absolute bg-gray-400 p-3 max-h-[40rem] w-[19rem] shadow rounded-lg flex flex-col items-left overflow-scroll`}
          >
            {props.moviesResults &&
              !props.movieSelected &&
              props.moviesResults.map((movie) => {
                return (
                  // AÑADÍ ONCLICK PARA QUE EL MENÚ DROPDOWN SE CIERRE AL HACER CLICK
                  <ul className="hover:btn-link my-1" onClick={() => setOpenSearch(!openSearch)}>
                    <li>
                      <a
                        onClick={() =>
                          (props.setsetMovieSelected(movie))
                        }
                      >
                        {movie.title}
                      </a>
                    </li>
                  </ul>
                );
              })}
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

