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
    // console.log(posts["0"].desc)

    const handleClick = () => {
        navigate('/createPost')
    }
    return ( 

        <div>

            <Navbar></Navbar>
            Home Page
            <div className="container">
                {/* Other page content */}
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>} 
                {(!posts) && <div>No data</div>}
                <div>
                {
                    posts.map((post) => (
                        // <Link to={`/search/searchedUser/${post._id}`}>
                        <div key={post._id}>
                        <li key={post._id}>{post.desc}</li>
                        <button>Add Comment</button>
                        <button>Comments</button>
                        </div>
                        // </Link>
                    ))
                }
                </div>
                <button className="fixed-button" onClick={handleClick}>Post</button>
            </div>
            
        </div>
    );
}
 
export default Home;