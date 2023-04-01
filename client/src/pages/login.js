import { useState } from "react"
import {toast} from "react-toastify"
import {Link} from "react-router-dom";


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const inputUsername = (e) => {
        // console.log(e.target.value);
        setUsername(e.target.value.trim())
    }

    const inputPassword = (e) => {
        // console.log(e.target.value);
        setPassword(e.target.value)
    }

    async function handleSubmit(e){
        e.preventDefault()

        if(!username || !password){
            toast.error("Please enter all fields")
        }
        else{

        }
    
    }

    return ( 
        <div className="signup">
            <h1>Ziraffe</h1>
                <form action="" onSubmit={handleSubmit}>
                <label for="">Username </label>
                <div>
                    <input type="text" placeholder="username" value={username} onChange = {inputUsername}/>
                </div>
                <label for="">Password </label>
                <div>
                    <input type="password" placeholder="password" value={password} onChange = {inputPassword}/>
                </div>
                <button type="submit">Log in</button>
                <p>Don't have an account?<Link to='/signup'>Sign Up</Link></p>
            </form>
        </div>
     );
}
 
export default Login;