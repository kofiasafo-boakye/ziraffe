import { useState } from "react"
import {toast} from "react-toastify"
import {Link} from "react-router-dom";



const SignUp = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

  const inputFirstName = (e) => {
    // console.log(e.target.value);
    setFirstName(e.target.value.trim())
  }
  const inputLastName = (e) => {
    // console.log(e.target.value)
    setLastName(e.target.value.trim())
  }
  const inputEmail = (e) => {
    // console.log(e.target.value);
    setEmail(e.target.value.trim())
  }
  const inputUsername = (e) => {
    // console.log(e.target.value);
    setUsername(e.target.value.trim())
  }
  const inputPassword = (e) => {
    // console.log(e.target.value);
    setPassword(e.target.value)
  }
  const inputConfirmPassword = (e) => {
    // console.log(e.target.value);
    setConfirmPassword(e.target.value)
  }

  const isValidEmail = (inputEmail) => { 
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(inputEmail).toLowerCase());
  }

  async function handleSubmit(e){
    e.preventDefault()

    if(!firstName || !lastName || !username || !email || !password || !confirmPassword){
        toast.error("Please enter all fields")
    }
    else if(!isValidEmail(email)){
        toast.error("Please enter a valid email")
    }
    else if (password.length < 8){
        toast.error("Password must be at least 8 characters")
    }
    else if (password !== confirmPassword){
        toast.error("Passwords do not match")
    }
    else{

    }


    // const response = await fetch("http://localhost:5000/api/register", {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     email,
    //     password
    //   }),
    // })

    // const data = await response.json()
    // console.log(data)
  }



    return ( 
        <div className="signup">
            <h1>Ziraffe</h1>
            <form action="" onSubmit={handleSubmit}>
            <label for="">First name</label>
            <div>
                <input type="text" placeholder="first name" value={firstName} onChange = {inputFirstName}/>
            </div>
            <label for="">Last name</label>
            <div>
                <input type="text" placeholder="last name" value={lastName} onChange = {inputLastName}/>
            </div>
            <label for="">Username</label>
            <div>
                <input type="text" placeholder="username" value={username} onChange = {inputUsername}/>
            </div>
            <label for="">Email</label>
            <div>
                <input type="text" placeholder="email" value={email} onChange = {inputEmail}/>
            </div>
            
            <label for="">Password</label>
            <div>
                <input type="password" placeholder="password" value={password} onChange = {inputPassword}/>
            </div>
            <label for="">Confirm Password</label>
            <div>
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange = {inputConfirmPassword}/>
            </div>
            <button type="submit">Sign Up</button>
            <p>Already have an account?<Link to='/'>Sign In</Link></p>
            </form>
        </div>

      
    );
}
 
export default SignUp;