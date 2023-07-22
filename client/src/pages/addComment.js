import Navbar from "../components/navbar";
import { useEffect, useState} from "react"
import { useParams, useNavigate, Link} from "react-router-dom";
import {toast} from "react-toastify"
import {BACKEND_API} from "../api/backend_api"
import Axios from "axios";
import useFetch from "../hooks/useFetch";
import { getStoredIdFromLocalStorage } from "../helpers/localStorageUtils";


const AddComment = () => {
    const [comment, setComment] = useState('')
    const navigate = useNavigate();
    const {id} = useParams()
    const sId = getStoredIdFromLocalStorage()
    const [isLoading, setIsLoading] = useState(false) //for the form button
    const {data: post, isPending, error} = useFetch(`${BACKEND_API}/post/${id}`)
    const {data: user} = useFetch(`${BACKEND_API}/user/profile/${sId}`)

    useEffect (() => {
        if(!sId){
            navigate('/')
        }
    }, [])

    console.log(post)

    const inputComment = (e) => {
        setComment(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!comment){
            toast.error("Please enter a comment")
        }
        else{

            // const sId = getStoredIdFromLocalStorage()
            // const formData = new FormData()
            // formData.append('userId',sId)
            // formData.append('comment',comment)
            // formData.append('firstName',user.firstName)
            // formData.append('lastName',user.lastName)
            // formData.append('username',user.username)
            // formData.append('profilePicture',user.profilePicture)

            // console.log(formData.get('userId'))
            // console.log(formData.get('comment'))
            // console.log(formData.get('firstName'))
            // console.log(formData.get('lastName'))
            // console.log(formData.get('username'))
            // console.log(formData.get('profilePicture'))

            Axios.post(`${BACKEND_API}/post/addComment/${id}`, 
            {
                            sId: sId,
                            comment: comment,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            username: user.username,
                            profilePicture: user.profilePicture
                        }
            )
            .then((response) => {
                setIsLoading(false)
                console.log(response)

                toast.success("Comment successful")
                navigate(`/home`)

            })
            .catch((err) => {toast.error(err.message)});

            // try{
            //     const response = await fetch(`${BACKEND_API}/post/addComment/${id}`, {
            //         method: "POST",
            //         credentials: 'include',
            //         headers: {
            //           'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify({
            //             sId: sId,
            //             comment: comment,
            //             firstName: user.firstName,
            //             lastName: user.lastName,
            //             username: user.username,
            //             profilePicture: user.profilePicture
            //         }),
            //       })
            // }
            // catch(error){
            //     toast.error(error)
            // }


            

        }
    }
    return ( 
        <div>
            <Navbar></Navbar>
            <h2 style={{ textAlign: "center" }} className="header">Add a comment</h2>
            <br /> <br />
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            <div className="image">
                <img src={`http://localhost:5000/uploads/${post.image}`} alt=" " />

            </div>
            <div className="comments">
                <br />
                <span><strong>{post.likes && post.likes.length}</strong> like(s) | </span>
                <span><strong>{post.comments && post.comments.length}</strong> comment(s) </span>
            </div>
            <span><strong>{post.username}</strong> </span>
            <span key={post._id}>{post.desc}</span>
            <br /><br /> <hr /><br />
            <div className="addComment">
                <br />
                <form action="" encType="multipart/form-data">
                    {/* <label htmlFor="">Enter a comment</label> */}
                        <input type="text" name="comment" required onChange={inputComment} placeholder="Comment..." value={comment}/>
                    <button onClick={handleSubmit}>Comment</button>
                </form>
            </div>
        </div>
     );
}
 
export default AddComment;