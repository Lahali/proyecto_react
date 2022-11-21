import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetData } from "./context/MoviesProvider";

const MovieCard = (props) => {
  const getId = props.movieId
  // console.log("esto debería ser el id", getId)

  return (
    <div className="bg-white h-28 shadow-md rounded-lg col-start-2 col-end-6 m-3 items-strech overflow-auto">
      <Link to={`/main/${getId}`}>
        <img
          className="h-28 w-auto float-left mr-4 rounded-l-md"
          src={`https://image.tmdb.org/t/p/w300${props.getMoviePoster}`}
          alt="movie poster"
        />
        <div className="mx-3 p-4">
          <h2 className="card-title">{props.getMovieTitle}</h2>
          <p>Número de escenas: {props.getMovieScenes}</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;


