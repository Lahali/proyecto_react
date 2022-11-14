import PreviousMap from "postcss/lib/previous-map"
import { useEffect } from "react"

export default function SearchMovie(props){

    const url = 'https://api.themoviedb.org/3/';
    const APIkey = process.env.REACT_APP_API_KEY_TMDB;
    console.log('APIkey',APIkey)
    const language = '&language=es-ES';
    const externalSource = '&external_source=imdb_id';
  
    // ejemplo que te devuelve peli a partir de IMDB_ID tt0230600
    // /useEffect(() => {
    //     fetch(`${url}find/tt0230600?api_key=${APIkey}${language}${externalSource}`)
    //       .then(res => res.json())
    //       .then(data => console.log('TMDB data: ', data))
    //   }, [])


    useEffect(() => {
        fetch(`${url}search/movie?api_key=${APIkey}&query=${props.search}&page=1${language}`)
          .then(res => res.json())
          .then(data=> {
            props.setMoviesResults(data.results);
            console.log('DATA! ',data.results)
          });
      }, [props.search])

const handleChange = e => props.setSearch(e.target.value)

console.log('props.moviesResults', props.moviesResults)


    return(
<>

        <div style={{border:"solid red 2px", padding:"10px"}}>
        <label>titulo de la peli? 
                    <input
                        type="text"
                        onChange={handleChange}
                        />
                </label>
            <hr/>

            {(props.moviesResults) && props.moviesResults.map(movie =>{
            return (
            <p onClick={()=>console.log(movie.title)}>
                {movie.title}
                </p>
            )})}


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
    )

}