import { useState } from "react"
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom' // esto para importar "props" con Link
import CloudinaryWidget from "../components/CloudinaryWidget"
import SearchMovie from "../components/SearchMovie"

export default function AddScene() {
    
    const location = useLocation()
    const  {latlng}  = location.state; //hay problemas con esto si al dar al boton cambia la url
    
    // state para luego poner en la escena. Demasiado lio hacer un state solo como que es un objecto anidado
    const [coordinates, setCoordinates] = useState(latlng.lat, latlng.lng);
    const [movieTitle, setMovieTitle] = useState("");
    const [sceneTitle, setSceneTitle] = useState("");
    const [sceneDescription, setSceneDescription] = useState("");
    const [url, updateUrl] = useState();
    
    const [scene, setScene] = useState({})
    

    // por el componente SearchMovie
    const [moviesResults, setMoviesResults] = useState([]); 
    const [search, setSearch] = useState("");
   





    const handleChangeMovieTitle = e => {
        setMovieTitle(e.target.value)
    }
    const handleChangeSceneTitle = e => {
        setSceneTitle(e.target.value)
    }
    const handleChangeSceneDescription = e => {
        setSceneDescription(e.target.value)
    }
    
    const handleSubmit = () => {
        setScene(
            {
            "type": "Feature",
            "properties": {
                "img": url,
                "scene_title": sceneTitle,
                "scene_description": sceneDescription,
                "position": "",
                "scene_ID" : "00001", // el id lo pone ya firebase en automatico?
                "imdb_movie_ID" : "tt0230600",
                "movie_title" : "Los Otros",
            },
            "geometry": {
                "coordinates": coordinates,
                "type": "Point"
            }
        }
        )
          };

         // console.log("url:" ,url)
          // console.log("scene:" ,scene)
        
        // console.log("coordinates:" ,coordinates)
        
    return (
        <div style={{padding: "20px"}}>
                <br/>
            <Link to='/home'>HOME</Link>
            <br/><hr/>

        <SearchMovie
            moviesResults={moviesResults}
            setMoviesResults={setMoviesResults}
            search={search}
            setSearch={setSearch}
        />

            <form>

            {/* <div className="form-control">
          <label className="label">
            <span className="label-text">titulo pelicula</span>
          </label>
          <input type="text"  className="input input-bordered" />
        </div> */}

               <br />
                <label className="label">titulo de la escena?
                    <input
                        type="text"
                        onChange={handleChangeSceneTitle}
                        />
                </label><br /><br />



                <label className="label">...y escribe algo
                    <textarea
                        rows="4"
                        cols="30"
                        placeholder="escribe algo aqui"
                        onChange={handleChangeSceneDescription}
                        name="sceneDescription"/>
                </label><br /><br />
                <CloudinaryWidget
                url={url}
                updateUrl={updateUrl}
                />
                <br/>
                <hr/>
                <label>SUBMIT
                {/* <input type="button" onClick={console.log('scene:::', scene)}/> */}
                {/* si aqui no pongo type='button' se comporta como un submit */}
                <button type="button" onClick={handleSubmit}/> 
                </label>
            </form>

                
        </div>
    )
}

// ejemplo de objecto escena que hay que subir:

/* const escena_para_agregar = {
    "type": "Feature",
    "properties": {
        "img":"./data/img/99.jpg",
        "escena": "juega a la playstation",
        "lugar": "Barcelona"
    },
    "geometry": {
        "coordinates": [
            2.0,
            41.0
        ],
        "type": "Point"
    }
} */
/* {
    "type": "Feature",
    "properties": {
        "img":"",
        "escena": "", // habria que cambiarlo por titulo escena
        "sceneDescription": "",
        "lugar": ""
    },
    "geometry": {
        "coordinates": latlng,
        "type": "Point"
    }
} */

// actualizar el State de objectos anidados es un poco complicado...
/* function handleChange(e) {    
    console.log("event target:" ,e.target)
    setScene(prev =>{
        return{
            ...prev,
            [e.target.name]: e.target.value
        }
    })
} */



//window.history.replaceState({}, document.title) // esto sirve a no tener problemas co el useLocation al refrescar la pagina