import React from "react";
import { Link } from "react-router-dom";
import imgNotFound from "../image/broken-4.jpeg";

const MovieCard = (props) => {

  const rating = props.getMovieRating.toFixed(2);

  

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
    <div className="bg-gray-800 h-28 shadow-md rounded-lg col-start-2 col-end-6 m-3 items-strech overflow-auto hover:bg-gray-900
    ">
      <Link to={`/main/${getId}`}>
        <img
          className="h-28 w-auto float-left mr-4 rounded-l-md"
          src={`https://image.tmdb.org/t/p/w300${props.getMoviePoster}`}
          alt="movie poster"
          onError={(e) => (e.target.src = imgNotFound)}
        />


        <div className="flex flex-col content-between h-full p-2">
          <h2 className="card-title text-gray-400 leading-5">{props.getMovieTitle}</h2>
          <p className="mt-2 text-gray-400">
            Número de escenas: {props.getMovieScenes}
          </p>
          <div className="flex flex-row mt-1 lg:mt-4 space-x-6 items-center">
            <progress
              className="progress progress-accent w-56"
              value={props.getMovieRating * 10}
              max="100"
            ></progress>
            <p className="text-gray-400">{rating}</p>
          </div>

        <div className="mx-3 p-4">
          <h2 className="card-title">{props.getMovieTitle}</h2>
          <p>Número de escenas: {number()}</p>

        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
