import React from 'react'

const MovieCard = (props) => {
  return (
    <div className="bg-white shadow-md rounded-lg col-start-2 col-end-6 m-3 items-strech">
      {/* aquí iría la imagen */}
      <div className="mx-3 p-4">
        <h2 className="card-title">{props.getMovieTitle}</h2>
        <p className="mx-2">Información: </p>
      </div>

  </div>
  )
}

export default MovieCard




{/* <img
     className="h-28 w-auto float-left mr-4"
     src={`https://starwars-visualguide.com/assets/img/starships/${getId[5]}.jpg`}
     alt="star wars starship"
     onError={(e) =>
       (e.target.src =
         "https://starwars-visualguide.com/assets/img/big-placeholder.jpg")
     }
   />  */}