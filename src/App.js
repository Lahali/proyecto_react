import { Routes, Route } from "react-router-dom";
import  { AuthProvider } from "./components/context/AuthContext";
import Welcome from "./components/pages/Welcome";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
