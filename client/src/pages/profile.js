import { useParams, useNavigate } from "react-router-dom";
import {BACKEND_API} from "../api/backend_api"
import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";


const Profile = () => {
    const {id} = useParams()

    const navigate = useNavigate()
    const [data, setData] = useState([]); 

    const {data: user, isPending, error} = useFetch(`${BACKEND_API}/user/profile/${id}`)

    console.log("id:",id)
    console.log("user",user)

    // const {data: album} = useFetch('http://localhost:8000/albums/' + id)

    const handleSubmit = () => {
        // console.log("id:",id)
        navigate(`/profile/EditProfile/${id}`)
    }

    return ( 
        <div>
            <Navbar></Navbar>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            <img src={`http://localhost:5000/uploads/${user.profilePicture}`} alt="" style={{width: '150px', height: '150px'}}/>
            <div>First Name:  {user.firstName}</div>
            <div>Last Name:  {user.lastName}</div>
            <div>Username:  {user.username}</div>
            <div>Email:  {user.email}</div>
            <div>Followers: {user.followers && user.followers.length}</div>
            <div>Following: {user.following && user.following.length}</div>
            <button onClick={handleSubmit}>Edit Details</button>            
        </div>
     );
}
 
export default Profile;