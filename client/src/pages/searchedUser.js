import Navbar from "../components/navbar";
import {toast} from "react-toastify"
import {BACKEND_API} from "../api/backend_api"
import { useParams} from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { getStoredIdFromLocalStorage } from "../helpers/localStorageUtils";

const SearchedUser = () => {
    const [text, setText] = useState('')
    const {id} = useParams()
    // const navigate = useNavigate()
    const [disabled, setDisabled] = useState(false)
    const {data: user, isPending, error} = useFetch(`${BACKEND_API}/user/profile/${id}`)
    const [sId, setsId] = useState('')

    //id of user doing the following
    


    useEffect(() => {
        // console.log(user.followers && user.followers)
        if(user.followers && user.followers.includes(sId)){
            // console.log('hi')
            setText('Unfollow')
        }
        else{
            // console.log('no hi')
            setText('Follow')
        }
        setsId(getStoredIdFromLocalStorage())
    }, [user])


    useEffect(() => {
        if(id && id === sId){
            setDisabled(true)
            console.log('id', id)
            console.log('sid', sId)
            console.log(disabled)
        }
    }, [])

    // useEffect(() => {
    //     window.location.reload()
    // }, [text])



    

    async function handleSubmit(){
        // console.log(typeof(sId))
        if(text === 'Follow'){
            //implement the FOLLOW code
            try {
                // console.log(`${BACKEND_API}/user/followUser/${id}`)
                const response = await fetch(`${BACKEND_API}/user/followUser/${id}`, {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sId
                    }),
                })

                const data = await response.json()
                console.log(data)
                if(response.status !== 200){
                    toast.error(data["message"])
                  }
                else{
                    toast.success("User followed")
                    window.location.reload()
                    // navigate("/search")
                }
            }
            catch(error){
                toast.error(error)
            }
        }
        else{
            try {
                // console.log(`${BACKEND_API}/user/followUser/${id}`)
                const response = await fetch(`${BACKEND_API}/user/unfollowUser/${id}`, {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sId
                    }),
                })

                const data = await response.json()
                console.log(data)
                if(response.status !== 200){
                    toast.error(data["message"])
                  }
                else{
                    toast.success("User unfollowed")
                    window.location.reload()
                }
            }
            catch(error){
                toast.error(error)
            }
        }
    }

    return ( 
        <div>
            <Navbar></Navbar>
            Searched User
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {/* <img src={`http://localhost:5000/uploads/${user.profilePicture}`} alt=" " style={{width: '150px', height: '150px'}}/> */}
            <div>First Name:  {user.firstName}</div>
            <div>Last Name:  {user.lastName}</div>
            <div>Username:  {user.username}</div>
            <div>Email:  {user.email}</div>
            <div>Followers: {user.followers && user.followers.length}</div>
            <div>Following: {user.following && user.following.length}</div>
            <button disabled = {disabled} onClick={handleSubmit}>{text}</button>
        </div>
    );
}
 
export default SearchedUser;