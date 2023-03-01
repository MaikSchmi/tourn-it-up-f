import React from 'react'
import { Link } from 'react-router-dom'

function LandingPageNavbar() {
  return (
    <div className="nav-ctn">
      <nav className="nav-one">
        <ul>
          <li><Link to="/" className="nav-logo">TournItUp</Link></li>
        </ul>
      </nav>
      <nav className="nav-two">
        <ul>
          <li><Link to="/" className="nav-two-item">Participate</Link></li>
          <li><Link to="/login" className="nav-two-item">Organize</Link></li>
          <li><Link to="/login" className="nav-login">Login</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default LandingPageNavbar
