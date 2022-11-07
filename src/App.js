import Main from "./pages/Main"
import Home from "./pages/Home";
import AddScene from "./pages/AddScene";

import { Routes, Route, Link } from "react-router-dom";

export default function App() {

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