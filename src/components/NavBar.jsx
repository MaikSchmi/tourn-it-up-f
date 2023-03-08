import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { AuthContext } from '../contexts/Auth.context';



function NavBar() {
  const { logoutUser, isAuthenticated, user } = useContext(AuthContext);
   const handleUserLogout = () => {
      logoutUser ({justUpdatedDetails: false})
   }

  return (
    <>
    <div className="nav-ctn">
      <nav className="nav-one">
        <ul>
          <li><Link to="/" className="nav-logo">TournItUp</Link></li>
        </ul>
      </nav>
      <nav className="nav-two">
        <ul>
          <li><Link to="/" className="nav-two-item">Forums</Link></li>
          <li><Link to="/tournaments/search?" className="nav-two-item">Participate</Link></li>
          <li><Link to={isAuthenticated && user.status !== "Member" ? "/tournaments/create" : "/membership-options" } className="nav-two-item">Organize</Link></li>
          {isAuthenticated ? 
          <>
          <li><Link to={`/profile/${user.username}`} className="nav-two-item">Profile</Link></li>
          <li><button type="submit" className="nav-logout" onClick={handleUserLogout}>Logout</button></li>
          </> : 
          <li><Link to="/login" className="nav-login">Login</Link></li>}
        </ul>
      </nav>
    </div>
    <Outlet />
    </>
  )
}

export default NavBar
