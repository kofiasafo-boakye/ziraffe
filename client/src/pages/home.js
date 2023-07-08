import Navbar from "../components/navbar";
import { useEffect} from "react"
import { useParams, useNavigate } from "react-router-dom";
import {BACKEND_API} from "../api/backend_api"
import useFetch from "../hooks/useFetch";
import { getStoredIdFromLocalStorage } from "../helpers/localStorageUtils";



const Home = () => {
    const navigate = useNavigate()
    const sId = getStoredIdFromLocalStorage()

    const {data: posts, isPending, error} = useFetch(`${BACKEND_API}/post/timeline/${sId}`)

    // useEffect hook to get the data of the user

    console.log(posts)

    const handleClick = () => {
        navigate('/createPost')
    }
    return ( 

        <div>

            <Navbar></Navbar>
            Home Page

            <div className="container">
                {/* Other page content */}
                <button className="fixed-button" onClick={handleClick}>Post</button>
            </div>
            
        </div>
    );
}
 
export default Home;