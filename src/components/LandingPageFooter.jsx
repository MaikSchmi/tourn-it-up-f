import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className="landing-footer-ctn">
      <div className="landing-footer-top-ctn">
        <h1>Ready to have some fun?</h1>
        <h2>Sign up for free and join your first Tournament today!</h2>
        <div className="landing-footer-buttons">
          <Link to="/signup">Sign Up</Link>
          <Link to="/">See Membership Options</Link>
        </div>
      </div>
      <div className="landing-footer-bottom-ctn">
        <h4>© 2023 TournItUp --- <span>by Asmaa and Maik</span> --- All Rights Reserved</h4>
      </div>
    </div>
  )
}

export default Footer
