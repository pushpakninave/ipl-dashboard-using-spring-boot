import { Link } from "react-router-dom";
import "./Navbar.scss"

export const NavBar = () => {
    return(
        <Link to={`/`} >
        <button className="home">HOME</button>
        </Link>
    )
} 