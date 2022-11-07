import React, { createContext, useContext, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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
  const [error, setError] = useState('')

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)

  //  los valores del parámetro vienen del evento (es una destructuración del evento con los valores que queremos)  
  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  // para el signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signup(user.email, user.password);
      console.log("super bien registrado");
    } catch (error) {
      console.log("algo va fatal", error);
      setError(error.message);
    }
  };

  // para el login
  const handleSubmitLogin = async (e) => {
    e.preventDefault()
    setError('')
    try{
      await login(user.email, user.password)
      console.log("HAS ENTRADO!!")
      console.log(auth)
    } catch (error) {
      console.log("hemos hecho algo mal", error)
      setError(error.message)
      console.log(auth, error)
    }
  }

  return (
    <authContext.Provider value={{ handleChange, handleSubmit, error, handleSubmitLogin }}>
      {children}
    </authContext.Provider>
  );
};
