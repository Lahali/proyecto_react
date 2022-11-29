import React from "react";
import { Link } from "react-router-dom";
import imgNotFound from "../image/broken-4.jpeg";
import { useGetData } from "../components/context/MoviesProvider";

const MovieCard = (props) => {
  const rating = props.getMovieRating.toFixed(2);

  const getId = props.movieId;
  const { scenes } = useGetData();

  //ASÍ APROVECHAMOS EL MAP DE LA HOME
  function number() {
    let scenesLength = scenes.length;
    let numScene = 0;
    for (let i = 0; i < scenesLength; i++) {
      if (scenes[i].properties.TMDB_ID === getId) {
        numScene++;
      }
    }
    return numScene;
  }

  return (
    <div className="lg:card lg:w-[250px] lg:block lg:h-[520px] lg:p-2 flex bg-gray-800 h-full shadow-md rounded-md col-start-2 col-end-6 m-3 items-strech hover:bg-gray-900">
      <Link to={`/main/${getId}`}>
        <img
          className="lg:h-auto lg:w-[250px] lg:rounded-md  h-28 w-auto float-left mr-4 rounded-l-md"
          src={`https://image.tmdb.org/t/p/w300${props.getMoviePoster}`}
          alt="movie poster"
          onError={(e) => (e.target.src = imgNotFound)}
        />

        <div className="lg:card-body lg:h-fit lg:p-3 flex flex-col content-between h-full p-2">
          <h2 className="card-title text-gray-200 leading-5">
            {props.getMovieTitle}
          </h2>
          <p className=" mt-2 text-gray-400">Escenas: {number()}</p>
          <div className="flex flex-row mt-1 lg:mt-4 space-x-3 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="orange"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>

            <p className="text-gray-400">{rating}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
