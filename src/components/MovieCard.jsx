import React from "react";
import { Link } from "react-router-dom";
import imgNotFound from "../image/broken-4.jpeg";

const MovieCard = (props) => {
  const getId = props.movieId
  
  return (
    <div className="bg-gray-800 h-28 shadow-md rounded-lg col-start-2 col-end-6 m-3 items-strech overflow-auto hover:bg-gray-900
    ">
      <Link to={`/main/${getId}`}>
        <img
          className="h-28 w-auto float-left mr-4 rounded-l-md"
          src={`https://image.tmdb.org/t/p/w300${props.getMoviePoster}`}
          alt="movie poster"
          onError={(e) => (e.target.src = imgNotFound)}
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
