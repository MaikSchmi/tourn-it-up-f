import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/Auth.context'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

function Profile() {
  const [ownPage, setOwnPage] = useState(false);
  const [ownFriends, setOwnFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});
  const [avatar, setAvatar] = useState("");
  const [bgImage, setBgImage] = useState("");
  const [messages, setMessages] = useState([]);

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

  const getMessages = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/auth/profile/messages/${user.username}`);
      setMessages(await response.data.messages);
    } catch (error) {
      console.log("Error getting messages: ", error);
    }
  }

  const handleAddFriend = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL_API}/auth/profile/add-friend/${username}`, {currentUser: user.username});
      const newFriendsList = response.data.newFriendsList;
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
      setOwnFriends(newFriendsList)
      renewToken();
      getUserData();
    } catch (error) {
      console.log("Error removing friend: ", error)
    }
  }

  const handleDeleteMessage = async (messageId) => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL_API}/auth/profile/messages/delete/${messageId}`, {currentUser: user.username});
      getMessages();
    } catch (error) {
      console.log("Error deleting message: ", error);
    }
  }

  const handleAvatarUpload = async (e) => {
    e.preventDefault();
    const fileToUpload = document.getElementById("a-file-chosen").files[0];
    let formData = new FormData();
    formData.append("imageUrl", fileToUpload);
    console.log(fileToUpload);
    try {
      const uploadedFile = await axios.post(`${import.meta.env.VITE_BASE_URL_API}/auth/uploadavatar/${user.username}`, formData, {withCredentials: true});
      setAvatar(uploadedFile.data.fileUrl);
    } catch (error) {
      console.log("Error uploading background image: ", error);
    }
  }
  const handleBgUpload = async (e) => {
    e.preventDefault();
    const fileToUpload = document.getElementById("b-file-chosen").files[0];
    let formData = new FormData();
    formData.append("imageUrl", fileToUpload);
    try {
      const uploadedFile = await axios.post(`${import.meta.env.VITE_BASE_URL_API}/auth/uploadbg/${user.username}`, formData, {withCredentials: true});
      setBgImage(uploadedFile.data.fileUrl);
    } catch (error) {
      console.log("Error uploading background image: ", error);
    }
  }

  useEffect(() => {
    userProfile.username === user.username ? setOwnPage(true) : setOwnPage(false);
    setAvatar(userProfile.profileImage);
    setBgImage(userProfile.profileBackgroundImage);
  }, [userProfile])


  useEffect(() => {
    console.log(messages);
  }, [messages])

  useEffect(() => {
    getUserData();
  }, [username, messages])

  useEffect(() => {
    setOwnFriends(user.friendsList);
    getUserData();
    getMessages();
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
        <img src={userProfile.profileImage} style={{width: "100px", borderRadius: "100px"}} />
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
        <h3>Following</h3>
        <div>
          <ul className="profile-friends-ul">
          {userProfile.friendsList.length ?
            userProfile.friendsList.map((friend) => {
              return (
                <Link to={`/profile/${friend.username}`} className="profile-friends-ul" key={friend._id}>
                  <div style={{display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"}}>
                    <div>
                      <li><img src={friend.profileImage} style={{width: "50px"}} /></li>
                    </div>
                    <div>
                      <li>{friend.username}</li>
                      <li>"{friend.slogan}"</li>
                    </div>
                  </div>
                </Link>
              )
            }) : <p>You are not following anyone.</p>
          }
          </ul>
        </div>
      </div>
      <hr style={{width: "90%"}}/>
      <div className="profile-page-detail-main">
        <h3>Invitations / Notifications</h3>
        <div className="profile-messages">
          {messages.length ?
            messages.map((message) => {
              return (
                <>
                {message.type === "Invitation" ?

                <ul key={message._id}>
                  <li>{message.subject}</li>
                  <li>{message.message}</li>
                  <li>{message.relatedTournament !== null ? <Link to={`/tournaments/${message.relatedTournament._id}`}>Go to Tournament</Link> : <p>TOURNAMENT DELETED</p>}</li>
                  <li>-</li>
                  <li><button type="button" className="remove-friend-btn" onClick={() => handleDeleteMessage(message._id)}>Delete Message</button></li>
                </ul>

                :

                <ul key={message._id}>
                  <li>{message.subject}</li>
                  <li>{message.message}</li>
                  <li>-</li>
                  <li><button type="button" className="remove-friend-btn" onClick={() => handleDeleteMessage(message._id)}>Delete Message</button></li>
                </ul>
                
                }
                </>
              )
            }) : <p>No messages.</p>
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
                  <td>{user.status !== "Premium Member" ? <Link className="profile-page-detail-table-link" to="/membership-options">Upgrade</Link> : <Link className="profile-page-detail-table-link" to="/membership-options">Change Membership</Link>}</td>
                </tr>
                <tr>
                  <th>Your Interests</th>
                  <td>
                    <ul style={{listStyleType: "none", paddingLeft: 0}}>  
                      {user.interest.length ? user.interest.map((int, index) => <li key={index}>{int}</li>) : <li>You have no interests indicated yet! Interests help you finding tournaments for you.</li>}
                    </ul>  
                  </td>
                  <td><Link className="profile-page-detail-table-link" to="/profile/settings">Update Your Interests</Link></td>
                </tr>
                <tr>
                  <th>Profile Picture</th>
                  <td><img src={userProfile.profileImage} style={{width: "75px", borderRadius: "100px"}} /></td>
                  <td>
                    <form onSubmit={handleAvatarUpload}>
                      <label className="tournament-card-add-file-input-btn tournament-card-add-file landing-font" >
                        Choose file
                        <input type="file" id="a-file-chosen" className="landing-font" onChange={(e) => setAvatar(e.target.value)} style={{display: "none"}} />
                      </label>
                      <button type="submit" className="tournament-card-add-file">Confirm</button>
                    </form>
                  </td>
                </tr>
                <tr>
                  <th>Profile Background Picture</th>
                  <td><img src={user.profileBackgroundImage} style={{width: "100px"}} /></td>
                  <td>
                    <form onSubmit={handleBgUpload}>
                      <label className="tournament-card-add-file-input-btn tournament-card-add-file landing-font" >
                        Choose file
                        <input type="file" id="b-file-chosen" className="landing-font" onChange={(e) => setBgImage(e.target.value)} style={{display: "none"}} />
                      </label>
                      <button type="submit" className="tournament-card-add-file">Confirm</button>
                    </form>
                  </td>
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
              <Link to={`/tournaments/${tournament._id}`} key={tournament._id} style={{textDecoration: "none", color: "blue"}} >
              <ul>
                <li>{tournament.name}</li>
              </ul>
              </Link>
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
            }) : <p>-</p>
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
