import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetData } from "./context/MoviesProvider";

const MovieCard = (props) => {
  const getId = props.movieId
  const { scenes  } = useGetData();

//ASÍ APROVECHAMOS EL MAP DE LA HOME
function number (){
  let scenesLength = scenes.length;
  let numScene = 0;
  for (let i=0; i<scenesLength; i++){
    if (scenes[i].properties.TMDB_ID === getId){
      numScene++;
    }
  }
  return numScene;
}

  return (
    <div className="bg-white h-28 shadow-md rounded-lg col-start-2 col-end-6 m-3 items-strech overflow-auto hover:bg-base-100">
      <Link to={`/main/${getId}`}>
        <img
          className="h-28 w-auto float-left mr-4 rounded-l-md"
          src={`https://image.tmdb.org/t/p/w300${props.getMoviePoster}`}
          alt="movie poster"
        />
        <div className="mx-3 p-4">
          <h2 className="card-title">{props.getMovieTitle}</h2>
          <p>Número de escenas: {number()}</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;


