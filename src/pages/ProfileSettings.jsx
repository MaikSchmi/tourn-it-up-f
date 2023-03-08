import React from 'react'
import { AuthContext } from '../contexts/Auth.context'
import { useContext  , useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ProfileSettings() {
  const { user, logoutUser } = useContext(AuthContext)
  const [updatedUserName, setUpdatedUserName]  = useState (user.username)
  const [updatedEmail, setUpdatedEmail]  = useState (user.email)
  const [currentPassword, setCurrentPassword]  = useState ('')
  const [updatedPassword , setUpdatedPassword] = useState ('')
  const [repeatUpdatedPassword , setRepeatUpdatedPassword]  = useState ('')
  

  const navigate = useNavigate();

  const handleUserUpdate = async (event)=> {
    event.preventDefault()
    try {
      const updatedUser = await axios.post(`${import.meta.env.VITE_BASE_URL_API}/auth/profile/settings`, {
        currentUser : user ,  
        username: updatedUserName,
        password: currentPassword,
        email: updatedEmail ,
        repeatUpdatedPassword : repeatUpdatedPassword ,
        updatedPassword : updatedPassword ,
      })
      user.username = updatedUserName;
      user.email = updatedEmail;
      navigate("/profile")
    } catch(err) {
      console.log(err)
    }}

    const handleDeleteUser = async (event) =>{
    event.preventDefault()
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL_API}/auth/profile/delete`, {
        currentUser : user 
      })
      logoutUser();
      navigate("/")
    } catch(err) {
      console.log(err)
    }}
 
  return (
    <div>
  <div style = {{padding : "50px"}} className = "form-page-top-level landing-font">
    <form onSubmit={handleUserUpdate} className= "profile-settings-form form-auth">
      <label>UserName:  
        <input type='text' value={updatedUserName} onChange = {(event) => {setUpdatedUserName(event.target.value)}} /> 
      </label>
      <label>Email:  
        <input type='email' value={updatedEmail} onChange = {(event) => {setUpdatedEmail(event.target.value)}} />  
      </label>
      <label>Current Password:   
        <input type='password' value = {currentPassword} onChange = {(event) => {setCurrentPassword(event.target.value)}} /> 
      </label>
      <label>New Password:   
        <input type='password' value = {updatedPassword} onChange = {(event) => {setUpdatedPassword(event.target.value)}} /> 
      </label>
      <label>Repeat New Password:
        <input type='password' value= {repeatUpdatedPassword} onChange = {(event) => {setRepeatUpdatedPassword(event.target.value)}} /> 
      </label>
      <button type='submit' > Update </button> 
    </form>
      </div>
    <div>
    <form onSubmit={handleDeleteUser} className= "profile-settings-form form-auth">
    <button type='submit' > Delete Account </button> 
     </form>  
        </div>
 </div>  
)}

export default ProfileSettings
