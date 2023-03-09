import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DeleteConfirmPopup from '../../components/DeleteConfirmPopup';
import { AuthContext } from '../../contexts/Auth.context';
import { v4 } from "uuid";
import Dates from '../../components/Dates';

function TournamentPage() {
  const {id} = useParams("id");
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [tournament, setTournament] = useState({});
  const [participants, setParticipants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [alreadyParticipating, setAlreadyParticipating] = useState(false);
  const [aboutToDelete, setAboutToDelete] = useState(false);
  const [statusState, setStatusState] = useState("");
  const [background, setBackground] = useState("");
  const [comment, setComment] = useState("");
  
  const [backgroundColor, setBackgroundColor] = useState("");
  const [backgroundOpacity, setBackgroundOpacity] = useState(255)
  const [textColor, setTextColor] = useState("");
  const [backgroundColorChangedMessage, setBackgroundColorChangedMessage] = useState("");
  const [textColorColorChangedMessage, setTextColorChangedMessage] = useState("");
  const [mediaBg, setMediaBg] = useState("");

  const navigate = useNavigate();
  const {user} = useContext(AuthContext);

  const saveReminder = `PREVIEW - click "Save changes" to apply.` 

  const getTournamentInfo = async () => {
    const tournamentInfo = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/tournaments/${id}`);
    setTournament(await tournamentInfo.data.tournament);
    setParticipants(await tournamentInfo.data.participants); 
    checkParticipation();    
    setLoadingDetails(false);
  }

  const updateTournamentStatus = () => {
    if (tournament.status === "Open") {
      setStatusState("status-format status-open");
    } else if (tournament.status === "Closed") {
      setStatusState("status-format status-closed");
    } else if (tournament.status === "Ended") {
      setStatusState("status-format status-ended");
    }
  }

  const addParticipant = async () => {
    try {
      const addedTournament = await axios.post(`${import.meta.env.VITE_BASE_URL_API}/tournaments/updateparticipants/${id}`, {user: user, signup: true})
      user.tournaments = addedTournament.data.user.tournaments;
      getTournamentInfo();
    } catch(error) {
      console.log("Error adding participant: ", error);
      if (error.response.status === 403) {
        setErrorMessage(error.response.data);
      }
    }
  }

  const removeParticipant = async () => {
    try {
      const resignedTournament = await axios.post(`${import.meta.env.VITE_BASE_URL_API}/tournaments/updateparticipants/${id}`, {user: user, resign: true})
      user.tournaments = resignedTournament.data.user.tournaments;
      getTournamentInfo();
    } catch (error) {
      console.log("Error removing participant: ", error);
      if (error.response.status === 403) {
        setErrorMessage(error.response.data);
      }
    }
  }

  const checkParticipation = () => {
    if (participants.find(participant => participant.username === user.username)) {
      setAlreadyParticipating(true);
    } else {
      setAlreadyParticipating(false);
    }
  }

  const handleEditClick = () => {
    	navigate(`/tournaments/${id}/update`)
  }
  
  const deleteConfirmed = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL_API}/tournaments/delete/${id}`, {user: user});
      navigate("/home");
    } catch(error) {
      console.log(error);
    }
  }

  const addComment = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL_API}/tournaments/comments/add`, {comment: comment, username: user.username, tournamentId: tournament._id});
      setComment("");
      getTournamentInfo();
    } catch (error) {
      console.log("Error posting", error);
    }
  }

  const deleteComment = async (id) => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL_API}/tournaments/comments/delete/${id}`, {tournamentId: tournament._id});
      getTournamentInfo();
    } catch (error) {
      console.log("Error deleting comment", error);
    }
  }

  const expandCollapseCustomize = () => {
    const customizeMenuClass = document.getElementById("customize-settings").classList;
    customizeMenuClass.contains("form-not-loaded") ? customizeMenuClass.remove("form-not-loaded") : customizeMenuClass.add("form-not-loaded");
  }

  const handleBgImageUpload = async (e) => {
    e.preventDefault();
    const fileToUpload = document.getElementById("file-chosen").files[0];
    let formData = new FormData();
    formData.append("imageUrl", fileToUpload);
    try {
      const uploadedFile = await axios.post(`${import.meta.env.VITE_BASE_URL_API}/tournaments/upload/${tournament._id}`, formData, {withCredentials: true});
      setBackground(uploadedFile.data.fileUrl);
    } catch (error) {
      console.log("Error uploading background image: ", error);
    }
  }

  const changeColors = () => {
    const elementsToModify = document.getElementsByClassName("background-modify");
    const alphaValue = parseInt(backgroundOpacity)
    for (let i = 0; i < elementsToModify.length; i++) {
      elementsToModify[i].style.color = textColor;
      elementsToModify[i].style.backgroundColor = backgroundColor + alphaValue.toString(16).toUpperCase();
    }
  }

  const handleSaveCustomizeChanges = async (e) => {
    e.preventDefault();
    const alphaValue = parseInt(backgroundOpacity).toString(16).toUpperCase();
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL_API}/tournaments/update-values/${tournament._id}`, {textColor: textColor, backgroundColor: backgroundColor + alphaValue});
      setBackgroundColorChangedMessage("");
      setTextColorChangedMessage("");
    } catch(error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    updateTournamentStatus();
    if (tournament.backgroundImage !== undefined && tournament.backgroundImage !== "") {
      setBackground(tournament.backgroundImage);
    } else {
      setBackground("../images/tournament_bg.png");
    }
    !loadingDetails && setBackgroundColor(tournament.backgroundColor.slice(0, 7));
    !loadingDetails && setBackgroundOpacity(parseInt(tournament.backgroundColor.slice(7), 16));
    !loadingDetails && setTextColor(tournament.textColor);
    
    setBackgroundColorChangedMessage("");
    setTextColorChangedMessage("");
  }, [tournament])

  useEffect(() => {
    console.log(participants)
    checkParticipation();
  }, [participants])

  useEffect(() => {
    getTournamentInfo();
  }, [])

  useEffect(() => {
    setTextColorChangedMessage(saveReminder);
    changeColors();
  }, [textColor])
  useEffect(() => {
    setBackgroundColorChangedMessage(saveReminder);
    changeColors();
  }, [backgroundColor])
  useEffect(() => {
    setBackgroundColorChangedMessage(saveReminder);
    changeColors();
  }, [backgroundOpacity])

  return loadingDetails ? <div>Loading ...</div> : (
    <div className="landing-font tournament-card-main-ctn bg-image" style={{backgroundImage: `url(${background})`}}>
      <DeleteConfirmPopup value={{deleteConfirmed, aboutToDelete, setAboutToDelete}}/> 
      {(participants.length && user.username === participants[0].username && tournament.status === "Open") ?
      <div className="tournament-card-btn-ctn">
        <button className="tournament-card-edit" type="button" onClick={handleEditClick}>Edit Tournament</button> 
        <button className="tournament-card-delete" type="button" onClick={() => setAboutToDelete(true)}>Delete Tournament</button>
      </div> : <></>}
      <h1 className="tournament-card-title" style={{color: tournament.textColor}}>{tournament.name}</h1>
      {tournament.organizer.username === user.username &&
      <>
      <div className="customize-btn-ctn">
        <button type="button" onClick={expandCollapseCustomize} className="customize-btn background-modify">
          <h3>Customize</h3>
        </button>
      </div>
      <div id="customize-settings" className="form-not-loaded">
        <div className="tournament-card-customize-main-ctn" >
          <div className="tournament-card-customize-section background-modify">
            <div className="tournament-card-customize-options-ctn">
              <div className="tournament-card-customize-option">Set Background Image<br/>
                <form onSubmit={handleBgImageUpload}>
                  <p style={{fontSize: "12px"}}>{mediaBg !== "" ? mediaBg.split(`\\`).pop() : <>No file chosen</>} </p>
                  <label className="tournament-card-add-file-input-btn tournament-card-add-file landing-font" >
                    Choose file
                    <input type="file" id="file-chosen" className="landing-font" value={mediaBg} onChange={(e) => setMediaBg(e.target.value)} style={{display: "none"}} />
                  </label>
                  <button type="submit" className="tournament-card-add-file">Confirm</button>
                </form>
              </div>
              <div className="tournament-card-customize-option">Set Background Color<br/>
                <div style={{display: "flex", flexDirection: "column"}}>
                  <label>
                    <input type="color" id="customize-color-picker" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
                  </label>
                  <label>
                    <input type="range" step="1" min="0" max="255" value={backgroundOpacity} onChange={(e) => setBackgroundOpacity(e.target.value)} />
                  </label>
                    {backgroundColorChangedMessage !== "" && <p className="form-error-message" style={{width: "130px"}}>{backgroundColorChangedMessage}</p>}
                </div>
              </div>
              <div className="tournament-card-customize-option">Set Text Color<br/>
                <div>
                  <label>
                    <input type="color" id="customize-color-picker" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
                    {textColorColorChangedMessage !== "" && <p className="form-error-message" style={{width: "130px"}}>{textColorColorChangedMessage}</p>}
                  </label>
                </div>
                <div>
                </div>
              </div>
            </div>
            <div>
              <button type="button" className="tournament-card-add-file" onClick={handleSaveCustomizeChanges} >Save changes</button>
            </div>
          </div>
        </div>
      </div>
      </>
      }
      {errorMessage !== "" && <div className="form-error-message">{errorMessage}</div>}
      <div className="tournament-card"> 
        <div className="tournament-card-section background-modify">
          <h3>Participants</h3>
          <span>Slots filled: {tournament.participants.length + 1} {tournament.maxParticipants > 0 && <span>/ {tournament.maxParticipants}</span>}</span>
          {tournament.minParticipants > 0 && <span>Minimum needed: {tournament.minParticipants}</span>}
          <ul className="tournament-card-participant-list">
            <Link className="tournament-card-participant-link" to={`/profile/${tournament.organizer.username}`}>
              <li style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "7px"}}>
                <img src={tournament.organizer.profileImage} style={{width: "25px", borderRadius: "100px"}} />
                {tournament.organizer.username}<span>👑</span>
              </li>
            </Link>
            {participants.map((participant) => {
              return(
              <Link key={participant.id} className="tournament-card-participant-link" to={`/profile/${participant.username}`}>
                <li style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "7px"}}>
                  <img src={participant.profileImage} style={{width: "25px", borderRadius: "100px"}}/>
                  {participant.username}
                </li>
              </Link>
              )})}
            {(user.username !== tournament.organizer.username && !alreadyParticipating && tournament.participants.length + 1 < tournament.maxParticipants && tournament.status === "Open") && <button type="button" className="tournament-card-participate" onClick={addParticipant}>Participate!</button>}
            {(user.username !== tournament.organizer.username && alreadyParticipating && tournament.status === "Open") && <button type="button" className="tournament-card-delete" onClick={removeParticipant}>Resign</button>}
          </ul>
        </div>
        <div className="tournament-card-section background-modify">
          <div>
            <h3>Details:</h3>
            <textarea type="text" cols="30" rows="20" value={tournament.description} readOnly />
          </div>
          <div>
            <h3>Additional Information:</h3>
            <textarea type="text" cols="30" rows="3" value={tournament.additionalInfo} readOnly />
          </div>
        </div>
        <div className="tournament-card-section background-modify">
          <h3>The Tournament</h3>
          <div>
            <span id="tournament-status" className={statusState}>Status: {tournament.status}</span>
            <ul key={v4()}>
              Challenge about:<li>{tournament.challenge}</li>
              Type:<li>{tournament.type}</li>
              {tournament.reward && <li>Reward: <span>{tournament.reward}</span></li>}
              {tournament.mapUrl && <li>Map:<br/><Link to={tournament.mapUrl}>See on Map</Link></li>}
              {tournament.updatePlatformUrl && <li>Connect:<br/><Link to={tournament.updatePlatformUrl}>Connect with the participants!</Link></li>}
              <li>-</li>
              <li>Where:{tournament.locationCity ? <span>{tournament.locationCity}, </span> : <></>}{tournament.locationCountry}</li>
              <li>Starts: <Dates>{tournament.startDate}</Dates></li>
              <li>Ends: <Dates>{tournament.endDate}</Dates></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="tournament-card-comment-main-ctn">
        <div className="tournament-card-comment-section background-modify">
          <h3>Comments</h3>
          {alreadyParticipating &&
          <>
            <textarea cols="30" rows="3" value={comment} onChange={(e) => setComment(e.target.value)} />
            <button className="tournament-card-participate" onClick={addComment} type="button">Post</button>
          </>
          }
          <ul>
            {!tournament.comments.length ? <div>No comments yet.</div> : [...tournament.comments].reverse().map((comment) => {
              return (
                <li key={comment._id} className="tournament-card-comment-ctn">
                  <span style={{fontWeight: "bold"}}>{comment.username}</span>: {comment.createdAt.replace("T", " - at: ").replace("Z", "")}
                  <textarea value={comment.comment} readOnly style={{resize: "none"}} /><br/>
                  {comment.username === user.username && <button type="button" onClick={() => deleteComment(comment._id)} className="tournament-card-delete-comment">Delete Comment</button>}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TournamentPage