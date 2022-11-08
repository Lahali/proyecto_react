import { addDoc, collection } from "firebase/firestore"
import { database } from "./firebase/firebaseConfig"


export default function AddMovieFirebase() {

    const colRef = collection(database, 'movies')


    // pelicula de ejemplo para subir al database
    const todo_sobre_mi_madre = {
        "type": "FeatureCollection",
        "title": "Todo Sobre Mi Madre",
        "año": "1998",
        "director": "Mauricio Almodovar",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "img": "./data/img/04.jpg",
                    "escena": "escena 1",
                    "lugar": "Madrid"
                },
                "geometry": {
                    "coordinates": [
                        -3.6845985895076945,
                        40.43027272940192
                    ],
                    "type": "Point"
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "img": "./data/img/05.jpg",
                    "escena": "escena 2",
                    "lugar": "Madrid"
                },
                "geometry": {
                    "coordinates": [
                        -3.7002468096461727,
                        40.413224328129296
                    ],
                    "type": "Point"
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "img": "./data/img/06.jpg",
                    "escena": "escena 3"
                },
                "geometry": {
                    "coordinates": [
                        2.1338997741775643,
                        41.409264448767175
                    ],
                    "type": "Point"
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "img": "./data/img/07.jpg",
                    "escena": "escena 4",
                    "lugar": "Barcelona"
                },
                "geometry": {
                    "coordinates": [
                        2.1897004171866854,
                        41.37563567774711
                    ],
                    "type": "Point"
                }
            }
        ]
    }

    const addToFirebase = () => {
        addDoc(colRef, todo_sobre_mi_madre)
        // console.log('hecho')
        // console.log('database', database)
    }

    return (
        <button onClick={addToFirebase}>ADD MOVIE TO FIREBASE</button>
    )
}