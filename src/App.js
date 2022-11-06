import './App.css';
import Main from "./Main"
import Home from "./Home";
import AddScene from "./AddScene";

import { Routes, Route, Link } from "react-router-dom";

const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/main' element={<Main />} />
        <Route path='/main/AddScene' element={<AddScene />} />
      </Routes>
    </>
  )
}

export default App;