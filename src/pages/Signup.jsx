import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
function Signup() {
  const [username , setUsername ] = useState ('')
  const [password , setPassword ] = useState ('')
  const [email , setEmail ] = useState ('')
  const [repeatPassword , setRepeatPassword ] = useState ('')
   const navigate = useNavigate()
 
  const handleUserCreate = async (event) => {
       event.preventDefault()
       if (password === repeatPassword){
    try{ 
      const user = await axios.post('http://localhost:5005/auth/signup', {
        username: username,
        password: password,
        email: email
      })
console.log(user)
navigate('/login')
    }
  catch (error){console.log(error)}
  }
    else {console.log("passwords don't match")}
} 
  return (
    <div>
      <h1>SignUp</h1>
      <form onSubmit={handleUserCreate }>
       <label>UserName: 
        <input type="text" placeholder="Name" value = {username} onChange = {(event)=> { setUsername(event.target.value)}} />
       </label>
       <label>Email Address:
        <input type="email" placeholder="Email" value = {email} onChange = {(event)=> { setEmail(event.target.value)}} />
       </label>
       <label>Password:
        <input type="password" placeholder="password" value = {password} onChange = {(event)=> { setPassword(event.target.value)}} />
       </label>
       <label>Repeat Password:
        <input type="password" placeholder="repeat"  value = {repeatPassword} onChange = {(event)=> { setRepeatPassword(event.target.value)}} />
       </label>
       <button type= 'submit'>Create Account</button>
      </form>
    </div>
  )
}

export default Signup
