import { useState } from "react"
import {toast} from "react-toastify"
import {Link, useNavigate} from "react-router-dom";
import {BACKEND_API} from "../api/backend_api"
import { getStoredIdFromLocalStorage } from "../helpers/localStorageUtils";



const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordType, setPasswordType] = useState('password')
    // const [id, setId] = useState("")
    
    // const storedId = getStoredIdFromLocalStorage()

    const navigate = useNavigate();//for programatic redirecting

    const inputUsername = (e) => {
        // console.log(e.target.value);
        setUsername(e.target.value.trim())
    }

    const inputPassword = (e) => {
        // console.log(e.target.value);
        setPassword(e.target.value)
    }

    const togglePassword = () => {
        if (passwordType === 'password'){
          setPasswordType('text')
          return
        }
        else{
          setPasswordType('password')
        }
    }
    // let response;

    async function handleSubmit(e){
        e.preventDefault()

        if(!username || !password){
            toast.error("Please enter all fields")
        }
        else{
            
            try{
                const response = await fetch(`${BACKEND_API}/auth/api/login`, {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password
                    }),
                })

                const data = await response.json()
                // console.log(data)
                // console.log(response.status)
                // console.log("message:",data["message"])
                if(response.status !== 200){
                    toast.error(data)
                    console.log("ERROR:",data)
                }
                else{
                    // navigate("/home")
                    // setId(data["user"])
                    // console.log("id:",data["user"]["_id"])
                    // console.log("id:",id)
                    localStorage.setItem('myId', data["user"])
                    // const sId = localStorage.getItem('myId')
                    const sId = getStoredIdFromLocalStorage()
                    // localStorage.removeItem('myId')
                    navigate(`/profile/${sId}`)
                    // localStorage.setItem('myId', data["user"])
                    console.log('storedId', localStorage.getItem('myId'))
                    // navigate(`/profile/${data["user"]}`)
                    
                    // console.log("data:",data["user"])
                    // console.log("login successful")
                }
            }
            catch(error){
                toast.error("Failed to connect to Database")
            }

        }            
    
    }

    return ( 
        <div className="signup">
            <h1>Ziraffe</h1>
                <form action="" onSubmit={handleSubmit}>
                <label>Username</label>
                <div>
                    <input type="text" placeholder="username" value={username} onChange = {inputUsername}/>
                </div>
                <label>Password</label>
                <div>
                    <input type={passwordType} placeholder="password" value={password} onChange = {inputPassword}/><button type="button" onClick={togglePassword}>view</button>
                </div>
                <button type="submit">Log in</button>
                <p>Don't have an account?<Link to='/signup'>Sign Up</Link></p>
            </form>
        </div>
     );
}
 
export default Login;