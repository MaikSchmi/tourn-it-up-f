import React from 'react'
import { useState , useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/Auth.context'

function Login() {
  const [email, setEmail ] = useState ('');
  const [password, setPassword ] = useState ('');
  const { loginUser, errorMessage } = useContext(AuthContext);

  const handleLogin = async (event) => {
    event.preventDefault()
    loginUser(email, password, {justSignedUp: false})
  } 

  return (
    <div className="form-page-top-level">
      <div className="form-ctn">
        <h1>Login</h1>
        <form onSubmit={handleLogin} className="form-auth">
        <div className="form-field-ctn">
          <label htmlFor="email">Email address:</label>
          <input type="email" name="email" placeholder="email@domain.com" value = {email} onChange = {(event)=> { setEmail(event.target.value)}} />
        </div>
        <div className="form-field-ctn">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" placeholder="*********" value = {password} onChange = {(event)=> { setPassword(event.target.value)}} />
        </div>
        <button type= 'submit'>LogIn</button>
        </form>
        <div>
          <Link to="/signup"><p>Don't have an account yet?</p></Link>
        </div>
        {errorMessage !== "" && <div style={{textAlign: "center", width: "200px"}} className="form-error-message">{errorMessage}</div>}
      </div>
    </div>
  )
}

export default Login
