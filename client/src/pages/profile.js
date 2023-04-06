import { useParams, useNavigate } from "react-router-dom";
import {BACKEND_API} from "../api/backend_api"
import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";



const Profile = () => {
    const {id} = useParams()

    const navigate = useNavigate()
    const [data, setData] = useState([]); 

    const {data: user, isPending, error} = useFetch(`${BACKEND_API}/user/profile/${id}`)

    console.log("id:",id)
    console.log("user",data)
    // const {data: album} = useFetch('http://localhost:8000/albums/' + id)

    return ( 
        <div>
            Profile
            Welcome {user.lastName}

            <button>Edit Profile</button>
        </div>
     );
}
 
export default Profile;