import React, { useContext } from 'react'
import { AuthContext } from '../contexts/Auth.context'

function NavBar() {
  const { logoutUser } = useContext(AuthContext);

  return (
    <nav>
      <button type="submit" onClick={logoutUser}>Logout</button>
    </nav>
  )
}

export default NavBar
