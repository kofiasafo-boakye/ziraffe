import Navbar from "../components/navbar";
import {toast} from "react-toastify"
import {BACKEND_API} from "../api/backend_api"
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useState } from "react";
import { getStoredIdFromLocalStorage } from "../helpers/localStorageUtils";

const SearchedUser = () => {
    const [text, setText] = useState('Follow')
    const {id} = useParams()
    const navigate = useNavigate()
    const {data: user, isPending, error} = useFetch(`${BACKEND_API}/user/profile/${id}`)

    //id of user doing the following
    const sId = getStoredIdFromLocalStorage()

    console.log(user)

    if(user.followers && user.followers.includes(id)){
        setText('unFollow')
    }

    

    const handleSubmit = () => {
        if(text == 'follow'){
            //dont forget to add the check that if the user in the params is the same as the one in the localstorage, then you wont be able to follow yourself, or better still, it should navigate straight your edit profile page if you click on your name from the search results
            //implement the FOLLOW code
        }
        else{
            
        }
    }

    return ( 
        <div>
            <Navbar></Navbar>
            Searched User
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {/* <img src={`http://localhost:5000/uploads/${user.profilePicture}`} alt="" style={{width: '150px', height: '150px'}}/> */}
            <div>First Name:  {user.firstName}</div>
            <div>Last Name:  {user.lastName}</div>
            <div>Username:  {user.username}</div>
            <div>Email:  {user.email}</div>
            <div>Followers: {user.followers && user.followers.length}</div>
            <div>Following: {user.following && user.following.length}</div>
            <button>{text}</button>
        </div>
    );
}
 
export default SearchedUser;