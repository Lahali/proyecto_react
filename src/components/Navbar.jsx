import { async } from "@firebase/util";
import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Signup from "../pages/Signup";
import { useAuth } from "./context/AuthContext";

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout;
  };

  return (
    <>
      <nav className="grid grid-cols-3 ">
        <div className="container flex justify-start p-2 mx-auto lg:space-x-4">
          <Link to="/home">
            <p className="text-xl font-bold">Home</p>
          </Link>
        </div>
        <div className="p-2 flex justify-center">
          <p className="text-center">{props.title}</p>
        </div>
        <div className="flex justify-end p-2">
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
            {/* hay que mover el eje z xq sino se queda detrás del mapa!! */}
            <div className={`${isOpen ? "" : "hidden"} right-0 rounded-md p-3 absolute z-[999] shadow w-40 h-28 bg-gray-100`}>
              <ul className="space-y-4 mt-3">
                <li>
                  <button htmlFor="my-modal-signup" className="hover:font-medium">Signup</button>
                </li>
                <li>
                  <a htmlFor="my-modal-login" href="#" className="hover:font-medium">Login</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Signup />
      <Login />
      <Logout/>

      {/* <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link to="/home">
            <p className="btn btn-ghost normal-case text-xl">Home</p>
          </Link>
        </div>
        <div className="navbar-center">
          <p className="normal-case text-xl">{props.title}</p>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>

            <ul
              tabIndex={0}
              className={`${isOpen ? "dropdown-content" : ""} mt-3 p-2 shadow menu menu-compact  bg-base-100 rounded-box w-52`}
            >
              <li>
                <label
                  htmlFor="my-modal-signup"
                >
                  Crea una cuenta
                </label>
              </li>
              <li>
              <label htmlFor="my-modal-login" >
                  Entra en tu cuenta
              </label>
              </li>
              <li>
                <label htmlFor = "my-modal-logout" onClick={handleLogout}>Logout</label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Signup />
      <Login />
      <Logout/> */}
    </>
  );
};

export default Navbar;
