import {NavLink} from  "react-router-dom";
import { getStoredIdFromLocalStorage } from "../helpers/localStorageUtils";


const Navbar = () => {

    const sId = getStoredIdFromLocalStorage()
    
    return ( 
        <nav className="navbar">
            {/* <h1>Ziraffe</h1> */}
            <div className="links">
                {/* with Navlink there is an active class automatically assigned to the active navlink */}


                <NavLink to="/home">Home</NavLink>
                <NavLink to={`/search`}>Search</NavLink>
                <NavLink to={`/profile/${sId}`}>Profile</NavLink>
                <button>Logout</button>
                {/* <NavLink to="/Add" >Add Album</NavLink> */}
            </div>
        </nav>
     );
}
 
export default Navbar;