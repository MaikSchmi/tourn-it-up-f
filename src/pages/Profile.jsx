import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/Auth.context'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

function Profile() {
  const [ownPage, setOwnPage] = useState(false);
  const [ownFriends, setOwnFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});
  const { user, renewToken } = useContext(AuthContext);
  const { username } = useParams("username");

  const getUserData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/auth/profile/find-user/${username}`);
      setUserProfile(response.data.userData);
      setLoading(false);
    } catch (error) {
      console.log("Error getting user data: ", error);
    }
  }

  const handleAddFriend = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL_API}/auth/profile/add-friend/${username}`, {currentUser: user.username});
      const newFriendsList = response.data.newFriendsList;
      console.log(response.data.newFriendsList);
      setOwnFriends(newFriendsList)
      renewToken();
      getUserData();
    } catch (error) {
      console.log("Error adding friend: ", error)
    }
  }
  const handleRemoveFriend = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL_API}/auth/profile/remove-friend/${username}`, {currentUser: user.username});
      const newFriendsList = response.data.newFriendsList;
      console.log(newFriendsList);
      setOwnFriends(newFriendsList)
      renewToken();
      getUserData();
    } catch (error) {
      console.log("Error removing friend: ", error)
    }
  }

  useEffect(() => {
    userProfile.username === user.username ? setOwnPage(true) : setOwnPage(false);
    console.log(ownFriends)
  }, [userProfile])

  useEffect(() => {
    getUserData();
  }, [username])

  useEffect(() => {
    setOwnFriends(user.friendsList);
    getUserData();
  }, [])

  return (
    <>
    {loading ? <p>Loading details...</p> :
    <div className="profile-page-main-ctn landing-font" style={{color: userProfile.profileTextColor, background: `url(${userProfile.profileBackgroundImage}`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed"}}>
      <div className="profile-page-settings-btn-ctn">
        {ownPage && <Link className="profile-page-settings-img" to='/profile/settings'><img src="../images/settings.png" /></Link>}
      </div>
      <div className="profile-page-top-ctn">
        <div>
          <img className="profile-page-img" src="../images/avatar-generic.png" />
        </div>
        <div className="profile-page-name-ctn">
          <h1>{userProfile.username}</h1>
          {<i>"{userProfile.slogan}"</i>}
        </div>
      </div>


      {ownPage 
      
      ?
      <>
      <hr style={{width: "90%"}}/>
      <div className="profile-page-detail-main">
        <h3>Friends</h3>
        <div>
          <ul>
          {userProfile.friendsList.length ?
            userProfile.friendsList.map((friend) => {
              return (
                <Link to={`/profile/${friend.username}`} className="profile-friends-ul" key={friend._id}>
                <ul className="profile-friends-ul" key={friend._id}>
                  <div>
                    <li><img src={friend.profileImage} style={{width: "50px"}} /></li>
                  </div>
                  <div>
                    <li>{friend.username}</li>
                    <li>"{friend.slogan}"</li>
                  </div>
                </ul>
                </Link>
              )
            }) : <p>You have no friends yet!</p>
          }
          </ul>
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
      </> 
      
      :
      
      <>
      <div style={{display: "flex", justifyContent: "center"}}>
        {!user.friendsList.some((friend) => friend.username === userProfile.username) ?
          <button type="button" onClick={handleAddFriend} className="add-friend-btn">Follow</button>:
          <button type="button" onClick={handleRemoveFriend} className="remove-friend-btn">Unfollow</button>
        }
      </div>
      <hr style={{width: "90%"}}/>
      <div className="profile-page-detail-main">
        <h3>{userProfile.username[userProfile.username.length] === "s" ? `${userProfile.username}' Interests` : `${userProfile.username}'s Interests` }</h3>
        <ul>
          {userProfile.interest.map((int, index) => <li key={index}>{int}</li> )}
        </ul>
      </div>
      <hr style={{width: "90%"}}/>
      <div className="profile-page-detail-main">
        <h3>{userProfile.username[userProfile.username.length] === "s" ? `${userProfile.username}' Upcoming Tournaments` : `${userProfile.username}'s Upcoming Tournaments` }</h3>
          {userProfile.tournaments.filter((tournament) => tournament.status !== "Ended").map((tournament) => {
            return(
              <ul key={tournament._id}>
                <li>{tournament.name}</li>
              </ul>
            )
          })}
      </div>
      <hr style={{width: "90%"}}/>
      <div className="profile-page-detail-main">
      <h3>{`Users ${userProfile.username} follows`}</h3>
        <div>
        <ul>
          {userProfile.friendsList.length ?
            userProfile.friendsList.map((friend) => {
              return (
                <Link to={`/profile/${friend.username}`} className="profile-friends-ul" key={friend._id}>
                  <ul className="profile-friends-ul" >
                    <div>
                      <li><img src={friend.profileImage} style={{width: "50px"}} /></li>
                    </div>
                    <div>
                      <li>{friend.username}</li>
                      <li>"{friend.slogan}"</li>
                    </div>
                  </ul>
                </Link>
              )
            }) : <p>You have no friends yet!</p>
          }
          </ul>
        </div>
      </div>
      </>}
    </div>
    }
    </>
  )
}

export default Profile
