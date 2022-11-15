import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetData } from "./context/MoviesProvider";

const MovieCard = (props) => {
  const getId = props.getMovieId;

  return (
    <div className="bg-white h-28 shadow-md rounded-lg col-start-2 col-end-6 m-3 items-strech">
      <Link to={`/main/${getId}`}>
        {/* aquí iría la imagen */}
        <img
          className="h-28 w-auto float-left mr-4 rounded-l-md"
          src={`https://image.tmdb.org/t/p/w300${props.getPoster}`}
          alt="movie poster"
        />
        {/* <p>{moviesData.title}</p> */}
        <div className="mx-3 p-4">
          <h2 className="card-title">{props.getTitle}</h2>
          <p className="mx-2">Información: </p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;


