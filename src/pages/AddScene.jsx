import { Link } from "react-router-dom"

export default function AddScene() {


    return (
        <div>
            <form>


                <label>a que pelicula quieres subir la escena?
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

                <input type="submit" />

            </form>

            <Link to='/main'>vueve al mapa</Link>
        </div>
    )
}