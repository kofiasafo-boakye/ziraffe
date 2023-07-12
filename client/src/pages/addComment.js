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
    const [isPending, setIsPending] = useState(false)
    const {data: post} = useFetch(`${BACKEND_API}/post/${id}`)
    const {data: user} = useFetch(`${BACKEND_API}/user/profile/${sId}`)

    console.log(post)

    const inputComment = (e) => {
        setComment(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!comment){
            toast.error("Please enter a comment")
        }
        else{

            const sId = getStoredIdFromLocalStorage()
            const formData = new FormData()
            formData.append('userId',sId)
            formData.append('comment',comment)
            formData.append('firstName',user.firstName)
            formData.append('lastName',user.lastName)
            formData.append('username',user.username)
            formData.append('profilePicture',user.profilePicture)

            console.log(formData.get('userId'))
            console.log(formData.get('comment'))
            console.log(formData.get('firstName'))
            console.log(formData.get('lastName'))
            console.log(formData.get('username'))
            console.log(formData.get('profilePicture'))

            Axios.post(`${BACKEND_API}/post/addComment/${id}`, 
                formData
            )
            .then((response) => {
                setIsPending(false)
                console.log(response)

                toast.success("Post successful")
                // navigate(`/home`)

            })
            .catch((err) => {toast.error(err.message)});

        }
    }
    return ( 
        <div>
            <Navbar></Navbar>
            Add a comment
            <form action="" encType="multipart/form-data">
                <label htmlFor="">Enter a comment</label>
                    <input type="text" name="comment" required onChange={inputComment} placeholder="Comment..." value={comment}/>
                <button onClick={handleSubmit}>Comment</button>
            </form>
        </div>
     );
}
 
export default AddComment;