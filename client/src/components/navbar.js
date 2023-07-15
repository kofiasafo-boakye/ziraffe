import {NavLink, useNavigate} from  "react-router-dom";
import { getStoredIdFromLocalStorage } from "../helpers/localStorageUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import {faInstagram} from "@fortawesome/free-brands-svg-icons"


const Navbar = () => {
    const navigate = useNavigate()
    const sId = getStoredIdFromLocalStorage()

    const handleClick = () => {
        localStorage.removeItem('myId')
        navigate('/')
    }
    
    return ( 
        <nav className="navbar">
            <h1 className="logo"><FontAwesomeIcon icon={faInstagram} /> Sovichete </h1>
            <div className="links">
                {/* with Navlink there is an active class automatically assigned to the active navlink */}


                {/* <NavLink to="/home">Home</NavLink> */}
                <NavLink to="/home" className="nav-link"><FontAwesomeIcon icon={faHome} size="24px"/></NavLink>
                {/* <NavLink to={`/search`}>Search</NavLink> */}
                <NavLink to={`/search`} className="nav-link"><FontAwesomeIcon icon={faSearch} /></NavLink>
                {/* <NavLink to={`/profile/${sId}`}>Profile</NavLink> */}
                <NavLink to={`/profile/${sId}`} className="nav-link"><FontAwesomeIcon icon={faUser} /></NavLink>
                {/* <button onClick={handleClick} className="nav-link">Logout</button> */}
                <span onClick={handleClick} className="nav-link"><FontAwesomeIcon icon={faSignOutAlt} /></span>
                {/* <NavLink to="/Add" >Add Album</NavLink> */}
            </div>
        </nav>
     );
}
 
export default Navbar;