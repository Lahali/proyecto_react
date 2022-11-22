
import { AuthProvider } from "./components/context/AuthContext";
import Welcome from "./pages/Welcome";
import Main from "./pages/Main"
import Home from "./pages/Home";
import AddScene from "./pages/AddScene";
import { Routes, Route } from "react-router-dom";


export default function App() {




  return (


    <AuthProvider>
      <Routes>
        <Route path='/proyecto_react' element={<Welcome />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/' element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path='/main' element={<Main />} />
        <Route path="/main/:id" element={<Main />} />
        <Route path='/AddScene' element={<AddScene />} />
      </Routes>
    </AuthProvider>

  );
}