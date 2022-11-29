import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const authContext = createContext();

// hook personalizado
export function useAuth() {
  return useContext(authContext);
}

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [user, setUser] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  //  los valores del parámetro vienen del evento (es una destructuración del evento con los valores que queremos)
  const handleChange = ({ target: { name, value } }) => {
    setUserData({ ...userData, [name]: value });
  };

  // SIGNUP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(userData.email, userData.password);
      navigate("/main");
    } catch (error) {
      console.log("algo va fatal", error);
      // setError(error.message);
      if(error.code === "auth/internal-error"){
        setError("Parece que algún dato está mal...")
      }
      if(error.code === "auth/weak-password") {
        setError("La contraseña es demasiado corta")
      }
      if(error.code === "auth/invalid-email") {
        setError("Ese correo no parece válido")
      }
      if(error.code === "auth/email-already-in-use"){
        setError("El usuario ya está registrado")
      }
    }
  };

  // LOGIN
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(userData.email, userData.password);
      setUserData({email: '', password: ''})
      navigate("/main");
    } catch (error) {
      console.log("hemos hecho algo mal", error);
      if(error.code === "auth/user-not-found"){
        setError("Ese usuario no está registrado")
      }
      if(error.code === "auth/weak-password") {
        setError("La contraseña es demasiado corta")
      }
      if(error.code === "auth/invalid-email") {
        setError("Ese correo no parece válido")
      }
      if(error.code === "auth/wrong-password"){
        setError("El usuario o la contraseña están mal")
      }
    }
  };

  // para el logout
  const logout = () => signOut(auth);

  // esta función de Firebase nos devuelve la información cada vez que el usuario cambia: abre o cierra sesión, etc
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);


  return (
    <authContext.Provider
      value={{
        handleChange,
        handleSubmit,
        error,
        handleSubmitLogin,
        logout,
        loading,
        user,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
