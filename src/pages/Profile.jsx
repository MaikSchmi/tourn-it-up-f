import React, { useContext } from 'react'
import { AuthContext } from '../contexts/Auth.context'

function Profile() {
  const {user} = useContext(AuthContext)
  return (
    <div>
      Hallo {user.username} {user.email}
    </div>
  )
}

export default Profile
