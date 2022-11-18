import PreviousMap from "postcss/lib/previous-map";
import { useState } from "react";
import { useEffect } from "react";

export default function SearchMovie(props) {
  const url = "https://api.themoviedb.org/3/";
  const APIkey = process.env.REACT_APP_API_KEY_TMDB;
  const language = "&language=es-ES";
  const externalSource = "&external_source=imdb_id";

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

  const handleChange = (e) => props.setUserSearch(e.target.value);

  return (
    <>
      <div className="relative ">
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
          //   onClick={() => setOpenSearch(!openSearch)}
        />

        {/* MENÚ DROPDOWN DE BÚSQUEDA el secreto es el absolute!*/}

        {/* el listado lo enseño solo si hay los resultado y aun no he elejido un titulo.
            Faltaria agregar el boton 'cambiar' */}
        {props.moviesResults &&
          !props.movieSelected &&
          props.moviesResults.map((movie) => {
            return (
              <ul>
                <a
                  className="relative"
                  onClick={() => props.setsetMovieSelected(movie)}
                >
                  {movie.title}
                </a>
              </ul>
            );
          })}
      </div>

      {/* <div>
<h4>{props.movie[0].title}</h4>
<img
src={`${base_URL}${props.movie[0].poster_path}`}
alt={props.movie[0].title}
/>
</div>


<div>
{
    props.film[0] ?
    <>
    <h4>{props.film[0].title}</h4>
    <img
    src={`${base_URL}${props.film[0].poster_path}`}
    alt={props.film[0].title}
    /> 
    </>
    :
    <>
    <h4>Sorry, movie not found</h4>
    </>
}   
</div> */}
    </>
  );
}
