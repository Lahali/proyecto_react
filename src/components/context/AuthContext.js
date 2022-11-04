import React, { createContext, useContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

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

  //  los valores del parámetro vienen del evento (es una destructuración del evento con los valores que queremos)  
  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(user.email, user.password);
      console.log("super bien registrado");
      setError("");
    } catch (error) {
      console.log("algo va fatal", error);
      setError(error.message);
    }
  };

  return (
    <authContext.Provider value={{ handleChange, handleSubmit, error }}>
      {children}
    </authContext.Provider>
  );
};
