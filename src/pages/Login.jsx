import React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [email , setEmail ] = useState ('')
  const [password , setPassword ] = useState ('')
  const navigate = useNavigate()
  const handleLogin = async (event) => {
    event.preventDefault()
    
 try{ 
   const user = await axios.post('http://localhost:5005/auth/login', {
      email: email ,
     password: password,
   
   })
console.log(user.data)
navigate('/profile')
 }
catch (error){console.log(error)}
} 
  return (

    <div>
       <h1>LogIn</h1>
      <form onSubmit={handleLogin }>
       
       <label>Email Address:
        <input type="email" placeholder="Email" value = {email} onChange = {(event)=> { setEmail(event.target.value)}} />
       </label>
       <label>Password:
        <input type="password" placeholder="password" value = {password} onChange = {(event)=> { setPassword(event.target.value)}} />
       </label>
       
       <button type= 'submit'>LogIn</button>
      </form>
    </div>
  )
}

export default Login
