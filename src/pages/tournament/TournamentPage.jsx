import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DeleteConfirmPopup from '../../components/DeleteConfirmPopup';
import { AuthContext } from '../../contexts/Auth.context';

function TournamentPage() {
  const {id} = useParams("id");
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [tournament, setTournament] = useState({});
  const [participants, setParticipants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [alreadyParticipating, setAlreadyParticipating] = useState(false);
  const [aboutToDelete, setAboutToDelete] = useState(false);
  const [statusState, setStatusState] = useState("");

  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const {user} = useContext(AuthContext);

  const getTournamentInfo = async () => {
    const tournamentInfo = await axios.get(`http://localhost:5005/tournaments/${id}`);
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
      await axios.post(`http://localhost:5005/tournaments/updateparticipants/${id}`, {user: user, signup: true})
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
      await axios.post(`http://localhost:5005/tournaments/updateparticipants/${id}`, {user: user, resign: true})
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
      await axios.post(`http://localhost:5005/tournaments/delete/${id}`, {user: user});
      navigate("/home");
    } catch(error) {
      console.log(error);
    }
  }

  const addComment = async () => {
    try {
      await axios.post(`http://localhost:5005/tournaments/comments/add`, {comment: comment, username: user.username, tournamentId: tournament._id});
      setComment("");
      getTournamentInfo();
    } catch (error) {
      console.log("Error posting", error);
    }
  }

  const deleteComment = async (id) => {
    try {
      await axios.post(`http://localhost:5005/tournaments/comments/delete/${id}`, {tournamentId: tournament._id});
      getTournamentInfo();
    } catch (error) {
      console.log("Error deleting comment", error);
    }
  }
  
  useEffect(() => {
    updateTournamentStatus();
  }, [tournament])

  useEffect(() => {
    checkParticipation();
  }, [participants])

  useEffect(() => {
    getTournamentInfo();
  }, [])

  return loadingDetails ? <div>Loading ...</div> : (
    <div className="landing-font tournament-card-main-ctn">
      <DeleteConfirmPopup value={{deleteConfirmed, aboutToDelete, setAboutToDelete}}/>
      {(user.username === participants[0].username && tournament.status === "Open") &&
      <div className="tournament-card-btn-ctn">
        <button className="tournament-card-edit" type="button" onClick={handleEditClick}>Edit Tournament</button> 
        <button className="tournament-card-delete" type="button" onClick={() => setAboutToDelete(true)}>Delete Tournament</button>
      </div>}

      <h1 className="tournament-card-title">{tournament.name}</h1>
      {errorMessage !== "" && <div className="form-error-message">{errorMessage}</div>}
      <div className="tournament-card"> 
        <div className="tournament-card-section">
          <h3>Participants</h3>
          <span>Slots filled: {tournament.participants.length + 1} {tournament.maxParticipants > 0 && <span>/ {tournament.maxParticipants}</span>}</span>
          {tournament.minParticipants > 0 && <span>Minimum needed: {tournament.minParticipants}</span>}
          <ul className="tournament-card-participant-list">
            {participants.map((participant, index) => <li key={participant.id}><Link to={`/profile/${participant.id}`}>{participant.username}</Link>{index === 0 && <span>👑</span>}</li>)}
            {(user.username !== tournament.organizer.username && !alreadyParticipating && tournament.participants.length + 1 < tournament.maxParticipants && tournament.status === "Open") && <button type="button" className="tournament-card-participate" onClick={addParticipant}>Participate!</button>}
            {(user.username !== tournament.organizer.username && alreadyParticipating && tournament.status === "Open") && <button type="button" className="tournament-card-delete" onClick={removeParticipant}>Resign</button>}
          </ul>
        </div>
        <div className="tournament-card-section">
          <div>
            <h3>Details:</h3>
            <textarea type="text" cols="30" rows="20" value={tournament.description} readOnly />
          </div>
          <div>
            <h3>Additional Information:</h3>
            <textarea type="text" cols="30" rows="3" value={tournament.additionalInfo} readOnly />
          </div>
        </div>
        <div className="tournament-card-section">
          <h3>The Tournament</h3>
          <div>
            <span id="tournament-status" className={statusState}>Status: {tournament.status}</span>
            <ul>
              <li>Challenge about: {tournament.challenge}</li>
              <li>Type: {tournament.type}</li>
              <li>Where: {tournament.locationCity ? <span>{tournament.locationCity}, </span> : <></>}{tournament.locationCountry}</li>
              {tournament.reward && <li>Reward: <span>{tournament.reward}</span></li>}
              {tournament.mapUrl && <li>Map:<br/><Link to={tournament.mapUrl}>See on Map</Link></li>}
              {tournament.updatePlatformUrl && <li>Connect:<br/><Link to={tournament.updatePlatformUrl}>Join the participants!</Link></li>}
              <li>Starts: {tournament.startDate.replace("T", ", at: ")}</li>
              <li>Ends: {tournament.endDate.replace("T", ", at: ")}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="tournament-card-comment-main-ctn">
        <div className="tournament-card-comment-section">
          <h3>Comments</h3>
          {alreadyParticipating &&
          <>
            <textarea cols="30" rows="3" value={comment} onChange={(e) => setComment(e.target.value)} />
            <button className="tournament-card-participate" onClick={addComment} type="button">Post</button>
          </>
          }
          <ul style={{listStyleType: "none"}}>
          {!tournament.comments.length ? <div>No comments yet.</div> : [...tournament.comments].reverse().map((comment) => {
            return (
              <li key={comment._id}>
                <span style={{fontWeight: "bold"}}>{comment.username}</span>: {comment.createdAt.replace("T", " - at: ").replace("Z", "")}
                <textarea value={comment.comment} readOnly style={{resize: "none"}} />
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