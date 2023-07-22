import Navbar from "../components/navbar";
import { useEffect} from "react"
import { useParams, useNavigate } from "react-router-dom";
import {BACKEND_API} from "../api/backend_api"
import useFetch from "../hooks/useFetch";
import { getStoredIdFromLocalStorage } from "../helpers/localStorageUtils";
import {toast} from "react-toastify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faComments, faHeart } from "@fortawesome/free-solid-svg-icons";




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
            <h2 style={{ textAlign: "center" }} className="header">Home</h2>
            <br /> <br />
            <div className="container">
                {/* Other page content */}
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>} 
                {/* {(posts && posts.length == 0) && <div>No data</div>} */}
                <div className="home">
                {
                    posts.map((post) => (
                        
                        <div key={post._id}>
                        <div className="image">
                            <img src={`http://localhost:5000/uploads/${post.image}`} alt=" " />
                        </div>
                        <br />
                        
                        {/* <button onClick={() => navigate(`/addComment/${post._id}`)}>Add Comment</button>
                        <button>Comments</button>
                        <button onClick={() => handleLike(post._id)}>Like</button> */}
                        <div className="icons">
                            <span onClick={() => navigate(`/addComment/${post._id}`)}><FontAwesomeIcon icon={faComment} size="2x"/></span>
                            <span><FontAwesomeIcon icon={faComments} size="2x"/></span>
                            <span onClick={() => handleLike(post._id)}><FontAwesomeIcon icon={faHeart} size="2x"/></span>
                        </div>
                        {/* <br /> */}
                        <div className="about">
                            <span><strong>{post.likes && post.likes.length}</strong> like(s) | </span>
                            <span><strong>{post.comments && post.comments.length}</strong> comments </span>
                            <span className="date">{post.createdAt.slice(0,10)}</span>

                        </div>
                        <span ><strong>{post.username}</strong> </span>
                        <span key={post._id} >{post.desc}</span>
                        <br /><br /><br /><hr /><br /><br />

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