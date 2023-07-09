import Navbar from "../components/navbar";
import { useEffect, useState} from "react"
import { useParams, useNavigate, Link} from "react-router-dom";
import { useState } from "react"
import {toast} from "react-toastify"
import {BACKEND_API} from "../api/backend_api"

const AddComment = () => {
    const [comment, setComment] = useState('')
    const navigate = useNavigate();

    const inputComment = (e) => {
        setComment(e.target.value)
    }

    async function handleSubmit(e){
        e.preventDefault()

        if(!comment){
            toast.error("Please enter a comment")
        }
        else{
            try{

            }catch(error){
                toast.error(error)
            }
        }
    }
    return ( 
        <div>
            Add a comment
            <form action="">
                <input type="text" onChange={inputComment} placeholder="Comment..." value={comment}/>
                <button onClick={handleSubmit}>Comment</button>
            </form>
        </div>
     );
}
 
export default AddComment;