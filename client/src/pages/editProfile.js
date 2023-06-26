import { useParams, useNavigate } from "react-router-dom";
import {BACKEND_API} from "../api/backend_api"
import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";
import Axios from "axios";




const initialState = {
    firstName : "",
    lastName: "",
    username: "",
    email: "",
    profilePicture: ""
}


const EditProfile = () => {
    const {id} = useParams()

    const navigate = useNavigate()
    const [data, setData] = useState([]); 

    // const {data: user, isPending, error} = useFetch(`${BACKEND_API}/user/profile/${id}`)

    const [state, setState] = useState(initialState)
    const {firstName, lastName, username, email, profilePicture} = state

    const url = `${BACKEND_API}/user/profile/${id}`

    useEffect(() => {
        Axios.get(url)
        .then((response) => {
            setState({...response.data})
            // console.log(response.data[0])
            console.log(profilePicture)
        })
    }, [url])

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