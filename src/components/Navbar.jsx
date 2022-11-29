import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../pages/LoginModal";
import Logout from "../pages/Logout";
import Signup from "../pages/SignupModal";
import { useAuth } from "./context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="grid grid-cols-3 p-2">
        <div className="container flex justify-start items-center p-2 ml-4 lg:space-x-4">
          <Link to="/home">
            <svg
              width="40"
              height="40"
              viewBox="0 0 612 612"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-secondary hover:fill-secondary-focus"
            >
              <path
                d="M573.75 267.75L459 344.25C459 321.032 448.443 300.492 432.11 286.454C470.991 263.026 497.25 220.817 497.25 172.125C497.25 98.187 437.312 38.25 363.375 38.25C289.438 38.25 229.5 98.188 229.5 172.125C229.5 209.629 245.01 243.442 269.873 267.75H199.722C218.044 247.42 229.5 220.779 229.5 191.25C229.5 127.87 178.13 76.5 114.75 76.5C51.37 76.5 0 127.87 0 191.25C0 225.828 15.625 256.466 39.818 277.504C16.199 290.528 0 315.371 0 344.25V497.25C0 539.497 34.253 573.75 76.5 573.75H382.5C424.747 573.75 459 539.497 459 497.25L573.75 573.75C594.883 573.75 612 556.633 612 535.5V306C612 284.867 594.883 267.75 573.75 267.75ZM114.75 267.75C72.503 267.75 38.25 233.497 38.25 191.25C38.25 149.003 72.503 114.75 114.75 114.75C156.997 114.75 191.25 149.003 191.25 191.25C191.25 233.497 156.997 267.75 114.75 267.75ZM363.375 267.96C310.437 267.96 267.54 225.043 267.54 172.125C267.54 119.187 310.457 76.29 363.375 76.29C416.293 76.29 459.21 119.187 459.21 172.125C459.21 225.063 416.312 267.96 363.375 267.96Z"
              />
            </svg>
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
              // className="btn btn-ghost btn-circle avatar"
              onClick={() => setIsOpen(!isOpen)}
            >
              {/* <div className="w-10 rounded-full"> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 mr-2 text-secondary hover:text-secondary-focus"
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
              } lg:mt-2 md:mt-2 lg:right-0 md:right-0 -right-4 w-screen rounded-md p-3 absolute z-[9999] shadow md:max-w-xs lg:max-w-xs h-auto bg-gray-900`}
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
