import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {

  const [isOpen, setIsOpen] = useState(false)
  const changeOpen = () => setIsOpen(!isOpen)

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link to="/">
          <a className="btn btn-ghost normal-case text-xl">Home</a>
        </Link>
      </div>
      <div className="navbar-center">
        <p className="normal-case text-xl">{props.title}</p>
      </div>
      <div className="navbar-end">

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar" onClick={changeOpen}>
            <div className="w-10 rounded-full">
              <img src="https://placeimg.com/80/80/people" />
            </div>
          </label>
    
          
          <ul
            tabIndex={0}
            className={`mt-3 p-2 shadow ${ isOpen ? "menu menu-compact" : "menu menu-compact dropdown-content"} bg-base-100 rounded-box w-52`}
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
// <div className="navbarContainer">
//     <Link to="/">Home</Link>
//     <h1>{props.title}</h1>
// </div>
