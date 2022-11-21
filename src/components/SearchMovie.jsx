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
        console.log("DATA! ", data.results); // guardar titulo, ID
      });
  }, [props.userSearch]);

  const handleChange = (e) => {
    props.setUserSearch(e.target.value);
  };

  return (
    <>
      <div className="">
        <label>
          <p>Busca la peli:</p>
          <input
            className="input input-bordered w-[16rem] my-2 h-10 bg-white mx-2"
            type="text"
            onChange={handleChange}
            disabled={props.movieSelected}
            /* mientras tecleo me enseña lo que tecleo, si escojo una peli me enseña solo esa */
            value={
              props.movieSelected ? props.movieSelected.title : props.userSearch
            }
            onClick={() => setOpenSearch(!openSearch)}
          />
        </label>

        {/* MENÚ DROPDOWN DE BÚSQUEDA el secreto es la combinación relative-absolute!*/}
        {/* el listado lo enseño solo si hay los resultado y aun no he elegido un titulo.
            Faltaria agregar el boton 'cambiar' */}
        <div className="relative flex flex-col items-center">
          <div
            className={`${
              openSearch ? "" : "hidden"
            } absolute bg-white p-3 max-h-[40rem] w-[19rem] shadow rounded-lg flex flex-col items-left overflow-scroll`}
          >
            {props.moviesResults &&
              !props.movieSelected &&
              props.moviesResults.map((movie) => {
                return (
                  // AÑADÍ ONCLICK PARA QUE EL MENÚ DROPDOWN SE CIERRE AL HACER CLICK
                  <ul className="btn btn-ghost hover:btn-link my-1" onClick={() => setOpenSearch(!openSearch)}>
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

<div className="dropdown dropdown-end">
  <label tabIndex={0} className="btn m-1">
    Click
  </label>
  <ul
    tabIndex={0}
    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
  >
    <li>
      <a>Item 1</a>
    </li>
    <li>
      <a>Item 2</a>
    </li>
  </ul>
</div>;
