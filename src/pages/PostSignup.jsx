import React, { useContext } from 'react'
import UpdateInterests from '../components/UpdateInterests';
import { AuthContext } from '../contexts/Auth.context';

function PostSignup() {
  const { user } = useContext(AuthContext);
  
  return (
    <div className="post-signup-ctn landing-font form-page-top-level">
      <div>
        <div className="form-ctn">
          <div className="post-signup-box">
            <h1 style={{marginBottom: "10px"}}>Welcome, {user && user.username}!</h1>
            <div>Thank you for joining our great GreatTournaments Community! You are now officially a GreatTournamentor!</div>
            <div>To give you the best experience, please tell us a few things that you like!</div>
          </div>
          <UpdateInterests />
        </div>
      </div>
    </div>
  )
}

export default PostSignup
