import { useState } from "react"
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom' // esto para importar "props" con Link
import CloudinaryWidget from "../components/CloudinaryWidget"

export default function AddScene() {
    
    const location = useLocation()
    const  {latlng}  = location.state; //ha problemas con esto si al dar al boton cambia la url
    
    // state para luego poner en la escena. Demasiado lio hacer un state solo como que es un objecto anidado
    const [coordinates, setCoordinates] = useState(latlng.lat, latlng.lng);
    const [movieTitle, setMovieTitle] = useState("");
    const [sceneTitle, setSceneTitle] = useState("");
    const [sceneDescription, setSceneDescription] = useState("");
    const [imgUrl, setiImgUrl] = useState("");
    
    const [scene, setScene] = useState({})
    
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
                    "img":"",
                    "escena": sceneTitle, // habria que cambiarlo por titulo escena
                    "sceneDescription": sceneDescription,
                    "lugar": ""
                },
                "geometry": {
                    //"coordinates": [latlng.lat, latlng.lng],
                    "coordinates": coordinates,
                    "type": "Point"
                }
            }
            )
        }
        
        // console.log("scene:" ,scene)
        // console.log("coordinates:" ,coordinates)
        
    return (
        <div style={{padding: "20px"}}>
                <br/>
            <Link to='/home'>HOME</Link>
            <br/><hr/>
            <form>
                <label>a que pelicula quieres subir la escena?
                    {/* aqui el ideal seria que cuando empieza a escribir le salgan
                    las peli que hay en TMDB y cuando selecciona una el ID de la peli,
                que puede ser el ID de IMDB se usa tambien como nuestro ID */}
                    <input
                        type="text"
                        onChange={handleChangeMovieTitle}
                        />
                </label><br /><br />
                <label>titulo de la escena?
                    <input
                        type="text"
                        onChange={handleChangeSceneTitle}
                        />
                </label><br /><br />

                <label>elije una foto
                    <input
                        type="file"
                        // onChange={handleChange}
                        />
                </label><br /><br />

                <label>...y escribe algo
                    <textarea
                        rows="4"
                        cols="30"
                        placeholder="escribe algo aqui"
                        onChange={handleChangeSceneDescription}
                        name="sceneDescription"/>
                </label><br /><br />

                <label>SUBMIT
                {/* <input type="button" onClick={console.log('scene:::', scene)}/> */}
                {/* si aqui no pongo type='button' se comporta como un submit */}
                <button type="button" onClick={handleSubmit}/> . 
                </label>
            </form>

                <CloudinaryWidget />
                
        </div>
    )
}

// ejemplo de objecto escena que hay que subir:

const escena_para_agregar = {
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
}
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