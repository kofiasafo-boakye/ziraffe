import { useState } from "react"
import {toast} from "react-toastify"
import {Link, useNavigate} from "react-router-dom";


const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordType, setPasswordType] = useState('password')

  const navigate = useNavigate();//for programatic redirecting

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
  const togglePassword = () => {
    if (passwordType === 'password'){
      setPasswordType('text')
      return
    }
    else{
      setPasswordType('password')
    }
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
      const response = await fetch("http://localhost:5000/auth/api/register", {
        method: "POST",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          password
        }),
      })
  
      const data = await response.json()
      // console.log(data)
      // console.log(response.status)
      // console.log("message:",data["message"])
      if(response.status !== 200){
        toast.error(data["message"])
      }
      else{
        navigate("/")
      }
      

    }



  }



    return ( 
        <div className="signup">
            <h1>Ziraffe</h1>
            <form action="" onSubmit={handleSubmit}>
            <label>First name</label>
            <div>
                <input type="text" placeholder="first name" value={firstName} onChange = {inputFirstName}/>
            </div>
            <label>Last name</label>
            <div>
                <input type="text" placeholder="last name" value={lastName} onChange = {inputLastName}/>
            </div>
            <label>Username</label>
            <div>
                <input type="text" placeholder="username" value={username} onChange = {inputUsername}/>
            </div>
            <label>Email</label>
            <div>
                <input type="text" placeholder="email" value={email} onChange = {inputEmail}/>
            </div>
            
            <label>Password</label>
            <div>
                <input type={passwordType} placeholder="password" value={password} onChange = {inputPassword}/><button type="button" onClick={togglePassword}>view</button>
            </div>
            <label>Confirm Password</label>
            <div>
                <input type={passwordType} placeholder="Confirm Password" value={confirmPassword} onChange = {inputConfirmPassword}/><button type="button" onClick={togglePassword}>view</button>
            </div>
            <button type="submit">Sign Up</button>
            <p>Already have an account?<Link to='/'>Sign In</Link></p>
            </form>
        </div>

      
    );
}
 
export default SignUp;