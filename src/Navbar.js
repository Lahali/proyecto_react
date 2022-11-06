import { Link } from "react-router-dom";

const Navbar = (props) => {

    return (
        <div className="navbarContainer">
            <Link to="/">Home</Link>
            <h1>{props.title}</h1>
        </div>
    )
}

export default Navbar;