import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/Auth.context';

function Footer() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      <div className="footer-ctn">
        {!isAuthenticated &&
        <div className="footer-top-ctn">
          <h1>Ready to have some fun?</h1>
          <h2>Sign up for free and join your first Tournament today!</h2>
          <div className="footer-buttons">
            <Link to="/signup">Sign Up</Link>
            <Link to="/membership-options">See Membership Options</Link>
          </div>
        </div>
        }
        <div className="footer-bottom-ctn">
          <h4>© 2023 TournItUp --- <span>by Asmaa and Maik</span> --- All Rights Reserved</h4>
        </div>
      </div>
    </>
  )
}

export default Footer
