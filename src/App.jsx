
import { AuthProvider } from "./components/context/AuthContext";
import Welcome from "./components/pages/Welcome";
import Main from "./pages/Main"
import Home from "./pages/Home";
import AddScene from "./pages/AddScene";

import { Routes, Route, Link } from "react-router-dom";

export default function App() {


  return (

    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path='/main' element={<Main />} />
        <Route path='/main/AddScene' element={<AddScene />} />
      </Routes>
    </AuthProvider>
  );
}




