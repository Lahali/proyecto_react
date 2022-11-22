import { async } from "@firebase/util";
import { getByTitle } from "@testing-library/react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Signup from "../pages/Signup";
import { useAuth } from "./context/AuthContext";
import { useGetData } from "./context/MoviesProvider";

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [searchOpen, setSearchOpen] = useState(false);
  // const [searchField, setSearchField] = useState('')
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout;
  };

  const {id} = useParams()
  const {moviesData} = useGetData()

  

  // esto es para evitar que dé errores al cargar esta página
  const avoidError = props.filteredMovies ? props.filteredMovies.length : 0;

  return (
    <>
      <nav className="grid grid-cols-3">
        <div className="container flex justify-start items-center p-2 mx-auto mt-2 lg:space-x-4">
          <Link to="/home">
            <p className="text-xl font-bold text-primary-content hover:text-primary-focus m-4">Volver</p>
          </Link>
        </div>
        <div className="p-2 hidden mt-3 lg:flex md:flex md:justify-center lg:justify-center">
          <p className="text-center"></p>
        </div>
        <div className="lg:hidden md:hidden"></div>
        <div className="flex justify-end items-center p-2">
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
            {/* hay que mover el eje z xq sino se queda detrás del mapa!! absolute es lo q hace que no mueva el resto*/}
            <div
              className={`${
                isOpen ? "" : "hidden"
              } lg:mt-2 md:mt-2 right-0 w-screen rounded-md p-3 absolute z-[9999] shadow md:max-w-xs lg:max-w-xs h-auto bg-base`}
              >
              <ul className="space-y-4 mt-3">
                <li>
                  <button className=" w-full p-2 rounded-full hover:bg-base-200 m-2">
                    <label htmlFor="my-modal-signup">Signup</label>
                  </button>
                </li>
                <li>
                  <button className=" w-full p-2 rounded-full hover:bg-base-200 m-2">
                    <label htmlFor="my-modal-login">Login</label>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Signup isOpen={isOpen} setIsOpen={setIsOpen} />
      <Login isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* <Logout /> */}
    </>
  );
};

export default Navbar;

