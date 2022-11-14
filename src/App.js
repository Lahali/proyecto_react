
import { AuthProvider } from "./components/context/AuthContext";
import Welcome from "./pages/Welcome";
import Main from "./pages/Main"
import Home from "./pages/Home";
import AddScene from "./pages/AddScene";
import { Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";

export default function App() {

  const url = 'https://api.themoviedb.org/3/'
  const APIkeyTMDB = 'acd4ce3d4f5b076a97e8814e1c6acf13'
  const language = '&language=es-ES'
  const externalSource = '&external_source=imdb_id'


  // useEffect(() => {
  //   fetch(`${url}find/tt0230600?api_key=${APIkeyTMDB}${language}${externalSource}`)
  //     .then(res => res.json())
  //     .then(data => console.log('TMDB data: ', data))
  // }, [])


  return (


    <AuthProvider>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path='/main' element={<Main />} />
        {/* <Route path="/main/:film" element={<Main/>} /> */}
        <Route path='/AddScene' element={<AddScene />} />
      </Routes>
    </AuthProvider>
  
  );
}