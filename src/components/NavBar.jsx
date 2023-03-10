import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { AuthContext } from '../contexts/Auth.context';

function NavBar() {
  const { logoutUser, isAuthenticated, user } = useContext(AuthContext);

   const handleUserLogout = () => {
      logoutUser()
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
        <Link to="/" className="nav-two-item"><li>Forums</li></Link>
        <Link to="/tournaments/search?" className="nav-two-item"><li>Participate</li></Link>
        <Link to={isAuthenticated && user.status !== "Member" ? "/tournaments/create" : "/membership-options" } className="nav-two-item"><li>Organize</li></Link>
          {isAuthenticated ? 
          <>
          <Link to={`/profile/${user.username}`} className="nav-two-item"><li>Profile</li></Link>
          <button type="submit" className="nav-logout" onClick={handleUserLogout}>Logout</button>
          </> : 
          <Link to="/login" className="nav-login">Login</Link>}
        </ul>
      </nav>
    </div>
    <Outlet />
    </>
  )
}

export default NavBar
