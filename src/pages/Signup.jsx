import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { AuthContext } from '../contexts/Auth.context'

function Signup() {
  const [username , setUsername ] = useState ('');
  const [password , setPassword ] = useState ('');
  const [email , setEmail ] = useState ('');
  const [repeatPassword , setRepeatPassword ] = useState ('');
  const [errorMessage, setErrorMessage] = useState("");
  const { loginUser } = useContext(AuthContext);
 
  const handleUserCreate = async (event) => {
    event.preventDefault()
    try { 
      await axios.post('http://localhost:5005/auth/signup', {
        username: username,
        password: password,
        repeatPassword: repeatPassword,
        email: email
      })
      loginUser(email, password, {justSignedUp: true});
    }
    catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.message)
    }
  }
  
  useEffect(() => {
    if (errorMessage !== "") setErrorMessage("");
  }, [])

  return (
    <div className="form-page-top-level">
      <div className="form-ctn">
        <h1>SignUp</h1>
        <form onSubmit={handleUserCreate } className="form-auth">
        <div className="form-field-ctn">
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" placeholder="Username" value = {username} onChange = {(event)=> { setUsername(event.target.value)}} />
        </div>
        <div className="form-field-ctn">
          <label htmlFor="email">Email address:</label>
          <input type="email" name="email" placeholder="email@domain.com" value = {email} onChange = {(event)=> { setEmail(event.target.value)}} />
        </div>
        <div className="form-field-ctn">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" placeholder="*********" value = {password} onChange = {(event)=> { setPassword(event.target.value)}} />
        </div>
        <div className="form-field-ctn">
          <label htmlFor="repeatPassword">Repeat password:</label>
          <input type="password" name="repeatPassword" placeholder="*********"  value = {repeatPassword} onChange = {(event)=> { setRepeatPassword(event.target.value)}} />
        </div>
        <button type= 'submit'>Create Account</button>
        </form>
        <div>
          <Link to="/login"><p>Already have an account?</p></Link>
        </div>
        {errorMessage !== "" && <div style={{textAlign: "center", width: "200px"}} className="form-error-message">{errorMessage}</div>}
      </div>
    </div>
  )
}

export default Signup
