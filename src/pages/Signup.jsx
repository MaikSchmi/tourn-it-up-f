import React from 'react'

function Signup() {
  return (
    <div>
      <h1>SignUp</h1>
      <form >
       <label>UserName:
        <input type="text" placeholder="Name" />
       </label>
       <label>Email Address:
        <input type="text" placeholder="Email" />
       </label>
       <label>Password:
        <input type="text" placeholder="password" />
       </label>
       <label>Repeat Password:
        <input type="text" placeholder="repeat" />
       </label>
       <button tvpe= 'submit'>Create Account</button>
      </form>
    </div>
  )
}

export default Signup
