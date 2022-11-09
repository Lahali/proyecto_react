import { async } from "@firebase/util";
import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Signup from "../pages/Signup";
import { useAuth } from "./context/AuthContext";

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const changeOpen = () => setIsOpen(!isOpen);
  const {logout} = useAuth()

  const handleLogout = async () => {
    await logout
  }

  return (
    <>
      <div className="navbar bg-base-100">
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
              onClick={changeOpen}
            >
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>

            <ul
              tabIndex={0}
              className={`mt-3 p-2 shadow menu menu-compact ${isOpen === true ? '' : 'dropdown-content'} bg-base-100 rounded-box w-52`}
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
      <Logout/>
    </>
  );
};

export default Navbar;
