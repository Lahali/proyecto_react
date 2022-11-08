import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar';
import peliculas from '../data/peliculas.json'  // el archivo con el array de peliculas

export default function Home(props) {

    const [filteredTitle, setFilteredTitle] = useState('');

    // todas las escenas de todas las pelis
    let allMoviesScenes = () => {
        let movieLength = peliculas.length;
        let movieFeatures = [];
        for (let i = 0; i < movieLength; i++) {
            movieFeatures.push(...peliculas[i].features)
        }
        // console.log('features:::,', movieFeatures)
        return (
            {
                title: 'TODAS LAS PELIS',
                features: movieFeatures
            }
        )
    }

    const handleChange = (e) => {
        setFilteredTitle(() => e.target.value)
    }

    // por cada pelicula del DB creamos un Link que manda al mapa con los marker de las escenas
    // esto viene filtrado segun el State filteredTitle
    let moviesList = []; // es mejor hacer así o llamar directamente a una funcion como allMoviesScenes???
    peliculas.forEach(pelicula => {
        if (pelicula.title.toLowerCase().indexOf(filteredTitle.toLowerCase()) === -1) {
            return;
        } else {
            moviesList.push(
                <li key={pelicula.title}>
                    <Link
                        to="./main"
                        state={{ film: pelicula }}>
                        {pelicula.title}
                    </Link>
                </li>
            )
        }
    })

    return (
        <div className="home">
    
            <h1>Esta es la Home</h1>

            <div>
                <Link
                    to="./main"
                    state={{ film: allMoviesScenes() }}>
                    Todas las peliculas
                </Link>

                <p>busca en nuestro archivo de {peliculas.length} peliculas!</p>

                <input
                    type="text"
                    placeholder='search...'
                    value={filteredTitle}
                    onChange={handleChange}>

                </input>
            </div>
            <ul>
                {moviesList}
            </ul>
        </div>
    )
}