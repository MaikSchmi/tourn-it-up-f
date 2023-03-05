import React, { useContext } from 'react'
import { AuthContext } from '../contexts/Auth.context'
import { Link } from 'react-router-dom'

function Profile() {
  const {user} = useContext(AuthContext)
  return (
    <div>
      Hallo  {user.username} {user.email}
      
      <Link to = '/profile/settings'>Settings</Link>
      <Link to="/membership-options">Update Membership Options</Link>
    </div>
  )
}

export default Profile
