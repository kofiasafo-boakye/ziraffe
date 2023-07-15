import Navbar from "../components/navbar";
import { useEffect} from "react"
import { useParams, useNavigate } from "react-router-dom";
import {BACKEND_API} from "../api/backend_api"
import useFetch from "../hooks/useFetch";
import { getStoredIdFromLocalStorage } from "../helpers/localStorageUtils";
import {toast} from "react-toastify"




const Home = () => {
    const navigate = useNavigate()
    const sId = getStoredIdFromLocalStorage()

    useEffect (() => {
        if(!sId){
            navigate('/')
        }
    }, [])

    const {data: posts, isPending, error} = useFetch(`${BACKEND_API}/post/timeline/${sId}`)

    // useEffect hook to get the data of the user

    console.log(posts)
    // console.log(posts["0"].desc)

    const handleClick = () => {
        navigate('/createPost')
    }

    async function handleLike (postId){
        // console.log(postId)
        try{
            const response = await fetch(`${BACKEND_API}/post/likePost/${postId}`, {
                method: "POST",
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sId
                }),
            })

            const data = await response.json()
            console.log(response)
            if(response.status !== 200){
                toast.error("error")
              }
            else{
                toast.success(data)
                setTimeout(() => {
                    window.location.reload();
                  }, 5000)
                // navigate("/search")
            }
            
        }
        catch(error){
            toast.error(error)
        }
    }

    return ( 

        <div>

            <Navbar></Navbar>
            Home Page
            <div className="container">
                {/* Other page content */}
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>} 
                {/* {(posts && posts.length == 0) && <div>No data</div>} */}
                <div>
                {
                    posts.map((post) => (
                        
                        <div key={post._id}>
                        <li key={post._id}>{post.desc}</li>
                        <button onClick={() => navigate(`/addComment/${post._id}`)}>Add Comment</button>
                        <button>Comments</button>
                        <button onClick={() => handleLike(post._id)}>Like</button>
                        </div>
                        
                    ))
                }
                </div>
                <button className="fixed-button" onClick={handleClick}>Post</button>
            </div>
            
        </div>
    );
}
 
export default Home;