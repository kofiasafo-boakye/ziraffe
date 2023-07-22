import { useParams, useNavigate } from "react-router-dom";
import {BACKEND_API} from "../api/backend_api"
import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import { getStoredIdFromLocalStorage } from "../helpers/localStorageUtils";



const Profile = () => {
    const {id} = useParams()

    const navigate = useNavigate()
    const [data, setData] = useState([]); 
    const sId = getStoredIdFromLocalStorage()


    const {data: user, isPending, error} = useFetch(`${BACKEND_API}/user/profile/${id}`)

    console.log("id:",id)
    console.log("user",user)

    // const {data: album} = useFetch('http://localhost:8000/albums/' + id)

    useEffect (() => {
        if(!sId){
            navigate('/')
        }
    }, [])

    const handleSubmit = () => {
        // console.log("id:",id)
        navigate(`/profile/EditProfile/${id}`)
    }

    return ( 
        <div>
            <Navbar></Navbar>
            <div>
                <h2 style={{ textAlign: "center" }} className="header">My Profile</h2>
                <br />
                <div className="profile">
                    {error && <div>{error}</div>}
                    {isPending && <div>Loading...</div>}
                    <img src={`http://localhost:5000/uploads/${user.profilePicture}`} alt=" " style={{width: '80px', height: '80px'}}/>
                    <br />
                    <div><strong>First Name:</strong> {user.firstName}</div>
                    <div><strong>Last Name:</strong> {user.lastName}</div>
                    <div><strong>Username:</strong> @{user.username}</div>
                    <div><strong>Email:</strong> {user.email}</div>
                    <div><strong>Followers:</strong> {user.followers && user.followers.length} followers</div>
                    <div><strong>Following:</strong> {user.following && user.following.length} following</div>
                    <button onClick={handleSubmit}>Edit Details</button> 
                </div>  
            </div>             
        </div>
     );
}
 
export default Profile;