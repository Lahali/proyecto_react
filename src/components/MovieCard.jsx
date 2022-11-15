import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetData } from "./context/MoviesProvider";

const MovieCard = (props) => {
  const getId = props.getMovieId;
  const { moviesData } = useGetData();
  const { id } = useParams();

  //  const moviesFiltered = moviesData.filter((item) => item.id === id ? item. : "")

  return (
    <div className="bg-white shadow-md rounded-lg col-start-2 col-end-6 m-3 items-strech">
      <Link to={`/main/${getId}`}>
        {/* aquí iría la imagen */}
        <img
          className="h-28 w-auto float-left mr-4"
          src={`https://image.tmdb.org/t/p/w300${moviesData.poster}`}
          alt="movie poster"
        />
        <p>{moviesData.title}</p>
        <div className="mx-3 p-4">
          <h2 className="card-title">{getId}</h2>
          <p className="mx-2">Información: </p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;

{
  /* <img
     className="h-28 w-auto float-left mr-4"
     src={`https://starwars-visualguide.com/assets/img/starships/${getId[5]}.jpg`}
     alt="star wars starship"
     onError={(e) =>
       (e.target.src =
         "https://starwars-visualguide.com/assets/img/big-placeholder.jpg")
     }
   />  */
}
