// import {NavLink} from  "react-router-dom";

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>Ziraffe</h1>
            <div className="links">
                {/* with Navlink there is an active class automatically assigned to the active navlink */}


                {/* <NavLink to="/">Home</NavLink> */}
                {/* <NavLink to="/Add" >Add Album</NavLink> */}
            </div>
        </nav>
     );
}
 
export default Navbar;