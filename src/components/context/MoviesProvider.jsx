import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { getDocs } from "firebase/firestore";
import { scenesRef } from "../firebase/firebaseConfig";
import { useParams } from "react-router-dom";
import { async } from "@firebase/util";

const moviesContext = React.createContext();

export function useGetData() {
  return useContext(moviesContext);
}

export const MoviesProvider = ({ children }) => {
  const [scenes, setScenes] = useState([]);
  const [moviesId, setMoviesId] = useState([]);
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

  const {id} = useParams()

  const url = "https://api.themoviedb.org/3/";
  const APIkey = process.env.REACT_APP_API_KEY_TMDB;

 useEffect(() => {
  getMovieData()
}, [])

const getMovieData = async() => {
  const data = await fetch(`${url}movie/1933?api_key=${APIkey}`)  
  const movie = await data.json()
  setMoviesData({title: movie.original_title, id: movie.id, poster: movie.poster_path })
}
console.log("lo estoy intentado...", moviesData)


  return (
    <div>
      <moviesContext.Provider value={{ moviesId, moviesData }}>
        {children}
      </moviesContext.Provider>
    </div>
  );
};
