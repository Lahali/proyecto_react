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
  const [moviesData, setMoviesData] = useState([{title:'', id:'', poster:''}]);

  //  duplico esta función aquí porque no puedo pasar scenes x props
  // con este useEffect guardamos todo el database de Firestore en el useState 'peliculas'
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





  const url = "https://api.themoviedb.org/3/";
  const APIkey = process.env.REACT_APP_API_KEY_TMDB;

// useEffect(() => {
//   getMovieData()
// }, [moviesId])

useEffect(() => {
  const data = []
  const idLenght = moviesId.length
  for(let i = 0; i < idLenght; i++) {
    const getMovieData = async() => {
      const data2 = await fetch(`${url}movie/${moviesId[i]}}?api_key=${APIkey}`)  
      const movie = await data2.json()
      data.push({title:movie.original_title, id: movie.id, poster: movie.poster_path})
    }
    getMovieData()
    setMoviesData(data)
  }

}, [moviesId])


console.log("lo estoy intentado...", moviesData)


  return (
    <div>
      <moviesContext.Provider value={{ moviesId, moviesData }}>
        {children}
      </moviesContext.Provider>
    </div>
  );
};
