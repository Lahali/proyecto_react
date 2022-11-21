import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { async } from "@firebase/util";

const authContext = createContext();

// hook personalizado
export function useAuth() {
  return useContext(authContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  //  los valores del parámetro vienen del evento (es una destructuración del evento con los valores que queremos)
  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  // SIGNUP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
      
    } catch (error) {
      console.log("algo va fatal", error);
      setError(error.message);
    }
  };

  // LOGIN
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      e.target.reset()
    } catch (error) {
      console.log("hemos hecho algo mal", error);
      setError(error.message);
      console.log(auth, error);
    }
  };

  // para el logout
  const logout = () => signOut(auth);

  // esta función de Firebase nos devuelve la información cada vez que el usuario cambia: abre o cierra sesión, etc
  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsuscribe();
  }, []);

  return (
    <authContext.Provider
      value={{
        handleChange,
        handleSubmit,
        error,
        handleSubmitLogin,
        logout
      }}
    >
      {children}
    </authContext.Provider>
  );
};
