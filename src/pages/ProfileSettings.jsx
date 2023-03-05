import React from 'react'
import { AuthContext } from '../contexts/Auth.context'
import { useContext  , useState } from 'react'
import axios from 'axios'


function ProfileSettings() {
    const {user} = useContext(AuthContext)
    
        
         const [ updatedUserName, setUpdatedUserName]  = useState (user.username)
         const [updatedEmail, setUpdatedEmail]  = useState (user.email)
         const [currentPassword, setCurrentPassword]  = useState ('')
         const [ updatedPassword , setUpdatedPassword ] = useState ('')
         const [ repeatUpdatedPassword , setRepeatUpdatedPassword]  = useState ('')

         const handleUserUpdate = async (event)=> {
                event.preventDefault()
            const updatedUser = await axios.post('http://localhost:5005/auth/profile/settings', {
             
             currentUser : user ,  
             username: updatedUserName,
             password: updatedPassword,
             email: updatedEmail ,
             repeatUpdatedPassword : repeatUpdatedPassword ,
             updatedPassword :updatedPassword ,
              })
        
    }
    return (
    <div>
    
      
        <form onSubmit={handleUserUpdate} >
        <label> UserName:  
       <input type= 'text' value={updatedUserName}  onChange = {(event)=> { setUpdatedUserName(event.target.value)}} /> 
        </label>
        <label> Email:  
       <input type= 'email' value={updatedEmail}  onChange = {(event)=> { setUpdatedEmail(event.target.value)}} />  
        </label>
        <label>Current Password:   
       <input type='password' value = {currentPassword} onChange = {(event)=> { setCurrentPassword(event.target.value)}} /> 
        </label>
        <label> New Password:   
       <input type='password' value = {updatedPassword} onChange = {(event)=> { setUpdatedPassword(event.target.value)}} /> 
        </label>
        <label> Repeat New Password:   

       <input type='password' value= {repeatUpdatedPassword} onChange = {(event)=> { setRepeatUpdatedPassword(event.target.value)}} /> 
        </label>


  <button type= 'submit' > Update </button>
     </form> 
    </div>
  )
    }

export default ProfileSettings
