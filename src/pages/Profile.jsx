import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/Auth.context'
import { Link } from 'react-router-dom'

function Profile() {
  const {user} = useContext(AuthContext)

  useEffect(() => {
    
  }, [])

  return (
    <div className="profile-page-main-ctn landing-font" style={{color: user.profileTextColor, background: `url(${user.profileBackgroundImage}`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed"}}>
      <div className="profile-page-settings-btn-ctn">
        <Link className="profile-page-settings-img" to='/profile/settings'><img src="../images/settings.png" /></Link>
      </div>
      <div className="profile-page-top-ctn">
        <div>
          <img className="profile-page-img" src="../images/avatar-generic.png" />
        </div>
        <div className="profile-page-name-ctn">
          <h1>{user.username}</h1>
          {user.slogan !== "" && <i>"{user.slogan}"</i>}
        </div>
      </div>
      <hr style={{width: "90%"}}/>
      <div className="profile-page-detail-main">
        <h3>Friends</h3>
        <div>
            {user.friendsList.length ?
              user.friendsList.map((friend) => {
                return (
                  <ul style={{listStyleType: "none", paddingLeft: 0}} key={friend._id}>
                    <li>{friend.profileImage}</li>
                    <li>{friend.username}</li>
                    <div>
                      <li>{friend.slogan}</li>
                    </div>
                    <button type="button">Send Message</button>
                  </ul>
                )
              }) : <p>You have no friends yet!</p>
            }
          
        </div>
      </div>
      <hr style={{width: "90%"}}/>
      <div className="profile-page-detail-main">
        <h3>Profile Details & Settings</h3>
        <div className = "profile-page-detail-ctn">
          <div className="profile-page-detail-table">
            <table>
              <tbody>
                <tr>
                  <th>User Status</th>
                  <td>{user.status}</td>
                  <td>{user.status !== "Premium Member" && <Link className="profile-page-detail-table-link" to="/membership-options">Update Membership Options</Link>}</td>
                </tr>
                <tr>
                  <th>Your Interests</th>
                  <td>
                    <ul style={{listStyleType: "none", paddingLeft: 0}}>  
                      {user.interest.length ? user.interest.map((int, index) => <li key={index}>{int}</li>) : <li>You have no interests indicated yet! Interests help you finding tournaments for you.</li>}
                    </ul>  
                  </td>
                  <td>{user.status !== "Premium Member" && <Link className="profile-page-detail-table-link" to="/membership-options">Update Your Interests</Link>}</td>
                </tr>
                <tr>
                  <th>Profile Picture</th>
                  <td><img src={user.profileImage} style={{width: "75px"}} /></td>
                  <td>{user.status !== "Premium Member" && <Link className="profile-page-detail-table-link" to="/membership-options">Change picture</Link>}</td>
                </tr>
                <tr>
                  <th>Profile Background Picture</th>
                  <td><img src={user.profileBackgroundImage} style={{width: "100px"}} /></td>
                  <td>{user.status !== "Premium Member" && <Link className="profile-page-detail-table-link" to="/membership-options">Change picture</Link>}</td>
                </tr>
                <tr>
                  <th>Profile Text Color</th>
                  <td><input type="color" /></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      
      
      
    </div>
  )
}

export default Profile
