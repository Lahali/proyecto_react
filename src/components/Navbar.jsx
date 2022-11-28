import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Login from "../pages/LoginModal";
import Logout from "../pages/Logout";
import Signup from "../pages/SignupModal";
import { useAuth } from "./context/AuthContext";
import { useGetData } from "./context/MoviesProvider";

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { logout, user, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsOpen(!isOpen);
  };

  // if(loading) return <h1>loading</h1>

  console.log("usuario", user);

  // esto es para evitar que dé errores al cargar esta página
  // const avoidError = props.filteredMovies ? props.filteredMovies.length : 0;

  return (
    <>
      <nav className="bg-gray-300 grid grid-cols-3">
        <div className="container flex justify-start items-center p-2 mx-auto mt-2 lg:space-x-4">
          <Link to="/home">
            <p className="text-xl font-bold text-gray-900 hover:text-secondary m-4">
              Volver
            </p>
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
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setIsOpen(!isOpen)}
            >
              {/* <div className="w-10 rounded-full"> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="black"
                  className="w-12 h-12 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              {/* </div> */}
            </label>
            {/* MENÚ DROPDOWN USUARIO */}
            {/* hay que mover el eje z xq sino se queda detrás del mapa!! absolute es lo q hace que no mueva el resto*/}
            <div
              className={`${
                isOpen ? "" : "hidden"
              } lg:mt-2 md:mt-2 right-0 w-screen rounded-md p-3 absolute z-[9999] shadow md:max-w-xs lg:max-w-xs h-auto bg-gray-900`}
            >
              <ul className="space-y-4 mt-3">
                <li>
                  <label
                    className="btn btn-ghost w-full p-2 text-neutral-content hover:bg-base-200 hover:text-secondary m-2"
                    htmlFor="my-modal-signup"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Signup
                  </label>
                </li>
                <li>
                  <label
                    className="btn btn-ghost w-full p-2 text-neutral-content hover:bg-base-200 hover:text-secondary m-2"
                    htmlFor="my-modal-login"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Login
                  </label>
                </li>
                <li>
                  <label
                    className={`${
                      user === null ? "hidden" : ""
                    } btn btn-ghost w-full p-2 text-neutral-content hover:bg-base-200 hover:text-secondary m-2`}
                    htmlFor="my-modal-logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Signup isOpen={isOpen} setIsOpen={setIsOpen} />
      <Login isOpen={isOpen} setIsOpen={setIsOpen} />
      <Logout isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Navbar;
