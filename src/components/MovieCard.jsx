import React from "react";
import { Link } from "react-router-dom";
import imgNotFound from "../image/broken-4.jpeg";

const MovieCard = (props) => {
  const getId = props.movieId;
  const rating = (props.getMovieRating).toFixed(2)

  return (
    <div className="bg-base h-28 shadow-md rounded-lg col-start-2 col-end-6 m-3 items-strech overflow-auto hover:bg-base-100">
      <Link to={`/main/${getId}`}>
        <img
          className="h-28 w-auto float-left mr-4 rounded-l-md"
          src={`https://image.tmdb.org/t/p/w300${props.getMoviePoster}`}
          alt="movie poster"
          onError={(e) => (e.target.src = imgNotFound)}
        />

        <div className="flex flex-col content-between h-full">
          <h2 className="card-title">{props.getMovieTitle}</h2>
          <p className="mt-2">Número de escenas: {props.getMovieScenes}</p>
          <div className="flex flex-row mt-1 lg:mt-4 space-x-6 items-center">
            <progress
              className="progress progress-warning w-56"
              value={props.getMovieRating * 10}
              max="100"
            ></progress>
            <p className="">{rating}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
