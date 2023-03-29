import { useState } from "react";

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const registerUser = async (e) => {
    e.preventDefault()

    const response = await fetch("http://localhost:1337/api/register", {
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
  }


  return (
    <div>
      <h1>Register</h1>
      <form action="" onSubmit={registerUser}>
        <input type="text" placeholder="name" value={name} onChange = {(e) => setName(e.target.value)}/>
        <input type="email" placeholder="email" value={email} onChange = {(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="password" value={password} onChange = {(e) => setPassword(e.target.value)}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
