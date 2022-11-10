import { useState } from "react"
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom' // esto para importar "props" con Link

export default function AddScene() {

    const location = useLocation()
    const { latlng } = location.state;

    const [scene, setScene] = useState(
    {
        "type": "Feature",
        "properties": {
        "img":"",
        "escena": "", // habria que cambiarlo por titulo escena
        "lugar": ""
        },
        "geometry": {
          "coordinates": latlng,
          "type": "Point"
        }
      }
)


    return (
        <div>
            <form>

                <label>a que pelicula quieres subir la escena?
                    {/* aqui el ideal seria que cuando empieza a escribir le salgan
                    las peli que hay en TMDB y cuando selecciona una el ID de la peli,
                    que puede ser el ID de IMDB se usa tambien como nuestro ID */}
                    <input
                        type="text" />
                </label>
                <br />
                <br />

                <label>elije una foto
                    <input type="file"></input>
                </label>
                <br />
                <br />

                <label>...y escribe algo
                    <textarea
                        rows="4"
                        cols="50"
                        value="escribe algo aqui" />
                </label>
                <br />
                <br />
                <label>SBUMIT
                {/* <input type="button" onClick={console.log('scene:::', scene)}/> */}
                <button onClick={console.log('scene:::', scene)}/>
                </label>

            </form>
                <br/>
            <Link to='/home'>vueve a la home</Link>
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