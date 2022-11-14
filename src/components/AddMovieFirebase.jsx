import {
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  getDocs
} from "firebase/firestore"
import { database } from "./firebase/firebaseConfig"

export default function AddMovieFirebase() {

  // movies de ejemplo para subir al database
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
  const vicky_cristina_barcelona = {
      "type": "FeatureCollection",
      "title": "Vicky Cristina Barcelona",
      "año": "2008",
      "director": "Jorge Garcia",
      "features": [
        {
          "type": "Feature",
          "properties": {
          "img":"./data/img/01.jpg",
          "escena": "accidente con la moto",
          "lugar": "Barcelona"
          },
          "geometry": {
            "coordinates": [
              2.17150441269672,
              41.37972930161351
            ],
            "type": "Point"
          }
        },
        {
          "type": "Feature",
          "properties": {
          "img":"./data/img/02.jpg",
          "escena": "miran la luna",
          "lugar": "Barcelona"
          },
          "geometry": {
            "coordinates": [
              2.1653607249637616,
              41.382484576989526
            ],
            "type": "Point"
          }
        },
        {
          "type": "Feature",
          "properties": {
          "img":"./data/img/03.jpg",
          "escena": "cantan una cancion"
          },
          "geometry": {
            "coordinates": [
              2.180896487048301,
              41.3881007383543
            ],
            "type": "Point"
          }
        }
      ]
    }
  
    // escena para agregar a un documento
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

    
    const moviesRef = collection(database, 'movies')  // moviesRef es collection reference
    
    // con esto nos referimos a la pelicula con el ID 70iIePh0APqkK5TKhsTx
    const moviesRefID = doc(database, 'movies', '70iIePh0APqkK5TKhsTx')
    
    let movies = [];  // eso devuelve un array con todas las pelis
    // get collection data
    getDocs(moviesRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        movies.push({ ...doc.data() })
        // si queremos tambien el ID: movies.push({ ...doc.data(), id: doc.id })
      })
    })
    .catch(err =>{
      console.log(err.message)
    })
    
    console.log('database: ', database)
    console.log('moviesRef: ', moviesRef)
    console.log('Movies: ', movies);
    
    const addToFirebase = () => {
      addDoc(moviesRef, todo_sobre_mi_madre)
      addDoc(moviesRef, vicky_cristina_barcelona)
      
      console.log('aggiunto film')
      console.log('database', database)
    }
    
    //const addScene = () => {
      // Atomically add a new region to the "regions" array field.
      updateDoc(moviesRefID, {
        features: arrayUnion(escena_para_agregar)
      })
      
      console.log("scene added")
      
      
      return
    }
    
    
    // COLLECTION es el array con todos las movies
    // DOCUMENT es la singula pelicula
  
    
    
    // con setDoc agrego un docuemnto y tengo que especificar un ID mientras
    // con addDoc Firebase agrega en automatico un ID
    //
    //     import { doc, setDoc } from "firebase/firestore"; 
    // // Add a new document in collection "cities" con ID "LA"
    // await setDoc(doc(db, "cities", "LA"), {
      //   name: "Los Angeles",
      //   state: "CA",
      //   country: "USA"
      // });