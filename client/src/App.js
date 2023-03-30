import { useState } from "react";

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const inputName = (e) => {
    // console.log(e.target.value);
    setName(e.target.value)
  }
  const inputEmail = (e) => {
    // console.log(e.target.value);
    setEmail(e.target.value)
  }
  const inputPassword = (e) => {
    // console.log(e.target.value);
    setPassword(e.target.value)
  }

  async function registerUser(e){
    e.preventDefault()

    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      }),
    })

    const data = await response.json()
    console.log(data)
  }


  return (
    <div>
      <h1>Register</h1>
      <form action="" onSubmit={registerUser}>
        <div>
          <input type="text" placeholder="name" value={name} onChange = {inputName}/>
        </div>
        <div>
          <input type="email" placeholder="email" value={email} onChange = {inputEmail}/>
        </div>
        <div>
          <input type="password" placeholder="password" value={password} onChange = {inputPassword}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
