import {NavLink, useNavigate} from  "react-router-dom";
import { getStoredIdFromLocalStorage } from "../helpers/localStorageUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import {faInstagram} from "@fortawesome/free-brands-svg-icons"
import Swal from 'sweetalert2'


const Navbar = () => {
    const navigate = useNavigate()
    const sId = getStoredIdFromLocalStorage()

    // const handleClick = () => {
    //     localStorage.removeItem('myId')
    //     navigate('/')
    // }

    const handleClick = () => {
        Swal.fire({
            title: 'Do you want to logout?',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                localStorage.removeItem('myId')
                navigate('/')
            } else if (result.isDenied) {
            //   Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }
    
    return ( 
        <nav className="navbar">
            <h1 className="logo"><FontAwesomeIcon icon={faInstagram} /> Sovichete </h1>
            <div className="links">
                {/* with Navlink there is an active class automatically assigned to the active navlink */}


                {/* <NavLink to="/home">Home</NavLink> */}
                <NavLink to="/home" className="nav-link"><FontAwesomeIcon icon={faHome} title="Home"/></NavLink>
                {/* <NavLink to={`/search`}>Search</NavLink> */}
                <NavLink to={`/search`} className="nav-link"><FontAwesomeIcon icon={faSearch} title="Search"/></NavLink>
                {/* <NavLink to={`/profile/${sId}`}>Profile</NavLink> */}
                <NavLink to={`/profile/${sId}`} className="nav-link"><FontAwesomeIcon icon={faUser} title="Profile"/></NavLink>
                {/* <button onClick={handleClick} className="nav-link">Logout</button> */}
                <span onClick={handleClick} className="nav-link"><FontAwesomeIcon icon={faSignOutAlt} title="Logout"/></span>
                {/* <span onClick={handleClick} className="nav-link"><FontAwesomeIcon icon={faSignOutAlt} /></span> */}
                {/* <NavLink to="/Add" >Add Album</NavLink> */}
            </div>
        </nav>
     );
}
 
export default Navbar;