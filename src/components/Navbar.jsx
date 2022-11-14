import { async } from "@firebase/util";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Signup from "../pages/Signup";
import { useAuth } from "./context/AuthContext";

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false)
  // const [searchField, setSearchField] = useState('')
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout;
  };


  // esto es para evitar que dé errores al cargar esta página
  const avoidError = props.filteredMovies ? props.filteredMovies.length : 0

  return (
    <>
      <nav className="grid grid-cols-3 ">
        <div className="container flex justify-start p-2 mx-auto mt-2 lg:space-x-4">
          <Link to="/home">
            <p className="text-xl font-bold">Home</p>
          </Link>
        </div>
        <div className="p-2 hidden mt-3 lg:flex md:flex md:justify-center lg:justify-center">
          <p className="text-center">{props.title}</p>
        </div>
        <div className="lg:hidden md:hidden"></div>
        <div className="flex justify-end p-2">
          {/* BÚSQUEDA */} 
          <div className="relative">
            <input
              className= 'input input-bordered lg:w-60 w-40 max-w-xs max-h-10 mx-3 mt-2'
              type="text"
              placeholder="buscar películas"
              value={props.filteredTitle}
              onChange={props.handleChange}
              onClick={() => setSearchOpen(!searchOpen)}
            />

            {/* MENÚ DROPDOWN BÚSQUEDA */}
            <div className= {`${searchOpen ? "" : "hidden"} right-0 bg-white rounded-md absolute z-[999] shadow w-60`}>
              <ul className="list-none space-y-4 mt-3">
                {/* hacemos un renderizado condicional xq si el array está undefined, así sigue funcionando */}
                {
                avoidError
                  ? props.filteredMovies && props.filteredMovies.map((movie) => (
                      <li className="link link-hover m-5" key={movie.title}>
                        {movie.title}
                      </li>
                    ))
                  : props.movies && props.movies.map((movie) => (
                      <li className="link link-hover m-5" key={movie.title}>
                        {movie.title}
                      </li>
                    ))}
                
              </ul>
            </div>
          </div>
          {/* USUARIO */}
          <div className="relative">
            <label
              // tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
            {/* MENÚ DROPDOWN USUARIO */}
            {/* hay que mover el eje z xq sino se queda detrás del mapa!! */}
            <div
              className={`${
                isOpen ? "" : "hidden"
              } right-0 rounded-md p-3 absolute z-[999] shadow w-40 h-28 bg-white`}
            >
              <ul className="lg:flex lg:flex-row lg:w-auto w-full space-y-4 mt-3">
                <li>
                  <button
                    htmlFor="my-modal-signup"
                    className="hover:font-medium"
                  >
                    Signup
                  </button>
                </li>
                <li>
                  <a
                    htmlFor="my-modal-login"
                    href="#"
                    className="hover:font-medium"
                  >
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Signup />
      <Login />
      {/* <Logout /> */}
    </>
  );
};

export default Navbar;
