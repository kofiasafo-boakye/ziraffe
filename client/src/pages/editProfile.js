import { useParams, useNavigate } from "react-router-dom";
import {BACKEND_API} from "../api/backend_api"
import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";

const EditProfile = () => {
    const {id} = useParams()

    const navigate = useNavigate()
    const [data, setData] = useState([]); 

    const {data: user, isPending, error} = useFetch(`${BACKEND_API}/user/profile/${id}`)


    return ( 
        <form action="">
            <label htmlFor="">First Name</label>
            <label htmlFor="">Last Name</label>
            <label htmlFor="">Username</label>
            <label htmlFor="">Email</label>
        </form>
    );
}
 
export default EditProfile;