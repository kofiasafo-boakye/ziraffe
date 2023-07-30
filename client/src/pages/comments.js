import Navbar from "../components/navbar";
import {BACKEND_API} from "../api/backend_api"
import useFetch from "../hooks/useFetch";
import { getStoredIdFromLocalStorage } from "../helpers/localStorageUtils";
import { useParams, useNavigate, Link} from "react-router-dom";
import { useEffect} from "react"

const Comments = () => {
    const sId = getStoredIdFromLocalStorage()
    const {id} = useParams()
    const navigate = useNavigate();


    useEffect (() => {
        if(!sId){
            navigate('/')
        }
    }, [])

    const {data: post, isPending, error} = useFetch(`${BACKEND_API}/post/${id}`)
    console.log(post)

    return ( 
        <div>
            <Navbar></Navbar>
            <h2 style={{ textAlign: "center" }} className="header">Comments</h2><br /><br />
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            
            <div className="image">
                <img src={`http://localhost:5000/uploads/${post.image}`} alt=" " />

            </div>
            <div className="comments">
                <br />
                <span><strong>{post.likes && post.likes.length}</strong> like(s) | </span>
                <span><strong>{post.comments && post.comments.length}</strong> comments(s) </span>
            </div>
            <span><strong>{post.username}</strong> </span>
            <span key={post._id}>{post.desc}</span>
            <br /><br /> <hr />

            <div className="comments">
            {(post.comments && post.comments.length == 0) && <div><strong>No Comments yet</strong></div>}
                {
                    post.comments && post.comments.map((comment) => (
                        <div>
                            <br />
                            <span><strong>@{comment.username}</strong> </span> 
                            <span>{comment.text}</span>
                            <br /><br />
                            <hr />
                        </div>
                        
                    )

                    )
                }

            </div>

            
        </div>
     );
}
 
export default Comments;