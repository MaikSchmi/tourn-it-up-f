import React from 'react'
import { AuthContext } from '../contexts/Auth.context'


function ProfileSettings() {
    const {user} = useContext(AuthContext)
    return (
    <div>
    
      
        <form onSubmit={handleUserCreate} >
        <label> UserName:  {user.username} 
       <input type = 'text'/>
        </label>
        <label> Email:  {user.email} 
       <input type = 'text'/>
        </label>
        <label> Password:  {user.password} 
       <input/>
        </label>
        <label> Repeat Password:  {user.repeatPassword} 

       <input/>
        </label>
  <button type= "submit"> Update </button>
     </form> 
    </div>
  )
}

export default ProfileSettings
