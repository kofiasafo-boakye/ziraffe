import Navbar from "../components/navbar";
import {toast} from "react-toastify"
import {BACKEND_API} from "../api/backend_api"
import { useParams, useNavigate} from "react-router-dom";
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
    const userId = getStoredIdFromLocalStorage()
    const navigate = useNavigate()



    useEffect (() => {
        if(!userId){
            navigate('/')
        }
    }, [])    


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

        if(id && id === sId){
            setDisabled(true)
            console.log('id', id)
            console.log('sid', sId)
            console.log(disabled)
        }
    }, [user])


    // useEffect(() => {
    //     if(id && id === sId){
    //         console.log('id', id) //when you remove this it doesnt work
    //         console.log('sid', sId) //when you remove this it doesnt work
    //         setDisabled(true)
    //         console.log('id', id)
    //         console.log('sid', sId)
    //         console.log(disabled)
    //     }
    // }, [])

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
            <h2 style={{ textAlign: "center" }} className="header">Searched User</h2>
            <br />
            
            <div className="profile">
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
                <img src={`http://localhost:5000/uploads/${user.profilePicture}`} alt=" " style={{width: '80px', height: '80px'}}/>
                <div><strong>First Name:</strong>  {user.firstName}</div>
                <div><strong>Last Name:</strong>  {user.lastName}</div>
                <div><strong>Username:</strong>  @{user.username}</div>
                <div><strong>Email:</strong>  {user.email}</div>
                <div><strong>Followers:</strong> {user.followers && user.followers.length}</div>
                <div><strong>Following:</strong> {user.following && user.following.length}</div>
                {/* <div>First Name:  <strong>{user.firstName}</strong></div>
                <div>Last Name:  <strong>{user.lastName}</strong></div>
                <div>Username:  <strong>{user.username}</strong></div>
                <div>Email:  <strong>{user.email}</strong></div>
                <div>Followers: <strong>{user.followers && user.followers.length}</strong></div>
                <div>Following: <strong>{user.following && user.following.length}</strong></div> */}
                <button disabled = {disabled} onClick={handleSubmit}>{text}</button>
            </div>
        </div>
    );
}
 
export default SearchedUser;