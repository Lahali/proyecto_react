import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { connectFirestoreEmulator, getDocs } from "firebase/firestore";
import { scenesRef } from "../firebase/firebaseConfig";
import { useParams } from "react-router-dom";
import { async } from "@firebase/util";

const moviesContext = React.createContext();

export function useGetData() {
  return useContext(moviesContext);
}

export const MoviesProvider = ({ children }) => {
  const [scenes, setScenes] = useState([]);
  // esto viene de la base de datos de firestore
  const [moviesId, setMoviesId] = useState([]);
  // esto viene de la api
  const [moviesData, setMoviesData] = useState([
    { title: "", id: "", poster: "" },
  ]);


  // con este useEffect guardamos todo el database de Firestore en el useState 'peliculas'
  // AQUÍ RECUPERAMOS LOS DATOS DE FIRESTORE
  useEffect(() => {
    let scenes = [];
    getDocs(scenesRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          scenes.push({ ...doc.data() }); // si queremos tambien el ID: movies.push({ ...doc.data(), id: doc.id })
          setScenes(scenes);
          console.log("useEffect!!!");
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);


// AQUÍ RECOGEMOS LOS ID PARA COMPARAR LOS ID DE SCENES CON LA API  
// devuelve los id de peliculas a partir de las escena
  useEffect(() => {
    let movieList = [];
    let sceneslength = scenes.length;
    for (let i = 0; i < sceneslength; i++) {
      if (movieList.includes(scenes[i].properties.TMDB_ID)) {
      } else {
        movieList.push(scenes[i].properties.TMDB_ID);
      }
    }
    setMoviesId(movieList);
  }, [scenes]);

  // ==> ESTA FUNCIONALIDAD CREO QUE ESTABA REPETIDA!!

  // const getSceneList = () => {
  //   getDocs(scenesRef)
  //     .then((response) => {
  //       const sceneList = response.doc.map((doc) => doc.data());
  //       setScenes(sceneList);
  //     })
  //     .catch((error) => console.log(error));
  // };

  // useEffect(() => {
  //   getSceneList();
  // }, [moviesId]);

  const url = "https://api.themoviedb.org/3/";
  const APIkey = process.env.REACT_APP_API_KEY_TMDB;

// AQUÍ LLAMAMOS A LA API Y LLENAMOS EL ARRAY CON LA INFO QUE NECESITAMOS
  useEffect(() => {
    let data = [];
    const idLength = moviesId.length;
    for (let i = 0; i < idLength; i++) {
      const getMovieData = async () => {
        const data2 = await fetch(
          `${url}movie/${moviesId[i]}}?api_key=${APIkey}`
        );
        const movie = await data2.json();
        data.push({
          title: movie.original_title,
          id: movie.id,
          poster: movie.poster_path,
        });
      };
      getMovieData();
    }
    Promise.all(data).then(setMoviesData(data));
  }, [moviesId]);

  //console.log("lo estoy intentado...", moviesData);

  return (
    <div>
      <moviesContext.Provider value={{ moviesId, moviesData, scenes }}>
        {children}
      </moviesContext.Provider>
    </div>
  );
};
