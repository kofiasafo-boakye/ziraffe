import { useParams, useNavigate } from "react-router-dom";
import {BACKEND_API} from "../api/backend_api"
import { useState, useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/navbar";
import { getStoredIdFromLocalStorage } from "../helpers/localStorageUtils";


const initialState = {
    firstName : "",
    lastName: "",
    username: "",
    email: "",
    profilePicture: ""
    

}




const EditProfile = () => {
    const sId = getStoredIdFromLocalStorage()

    const {id} = useParams()

    const navigate = useNavigate()
    // const [data, setData] = useState([]); 
    const [isPending, setIsPending] = useState(false)

    // const {data: user, isPending, error} = useFetch(`${BACKEND_API}/user/profile/${id}`)

    const [state, setState] = useState(initialState)
    const {firstName, lastName, username, email, profilePicture} = state
    const [image, setImage] = useState('')
    console.log(profilePicture)

    const url = `${BACKEND_API}/user/profile/${id}`

    useEffect (() => {
        if(!sId){
            navigate('/')
        }
    }, [])

    useEffect(() => {
        Axios.get(url)
        .then((response) => {
            setState({...response.data})
            // console.log(response.data[0])
            // console.log(profilePicture)
        })
        .catch((error) => {
            toast.error(error)
        })
    }, [url])

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        console.log(e.target)
        setState({...state, [name]: value})
        // console.log(state)
    
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        if(!firstName || !lastName || !email || !profilePicture || !image){ 
            toast.error("Please fill all fields")
        }
        else{
            const formData = new FormData()
            formData.append('firstName',firstName)
            formData.append('lastName',lastName)
            formData.append('email',email)
            // formData.append('username',username)
            formData.append('image',image)
            console.log(formData.get('firstName'))
            console.log(formData.get('profilePicture'))
            setIsPending(true)
            
            
            
            Axios.post(`${BACKEND_API}/user/editProfile/${id}`, 
                formData
            )
            .then((response) => {
                setIsPending(false)
                console.log(response)
                
                // setUsername("")
                // setBio("")
                toast.success("User updated successfully")
                navigate(`/profile/${id}`)
                // window.location.reload()
                
            })
            .catch((err) => {toast.error(err.message)});
            

            
        }


    }

    return ( 
        <div >
            <Navbar></Navbar>
            <div className="editProfile">
            <h2 className="header">My Profile</h2>
                <br />
                <img src={`http://localhost:5000/uploads/${profilePicture}`} alt=" " style={{width: '90px', height: '90px'}}/>
                <form action="" encType="multipart/form-data">
                    <label htmlFor="">First Name</label>
                        <div>
                            <input type="text" name = "firstName" required onChange={handleInputChange} value={firstName}/>
                        </div>
                    <label htmlFor="">Last Name</label>
                        <div>
                            <input type="text" name = "lastName" required onChange={handleInputChange} value={lastName}/>
                        </div>
                    {/* <label htmlFor="">Username</label>
                        <input type="text" name = "userame" required onChange={handleInputChange} value={username}/> */}
                    <label htmlFor="">Email</label>
                        <div>
                            <input type="text" name = "email" required onChange={handleInputChange} value={email}/>
                        </div>
                    <label htmlFor="">Change your profile photo</label>
                        <div>
                            <input type="file" onChange={(e) => setImage(e.target.files[0])} required/>
                        </div>
                     
                    {isPending && <button >Editing...</button>}
                    {!isPending && <button onClick={handleSubmit}>Edit</button>}
                </form>
            </div>
        </div>
    );
}
 
export default EditProfile;