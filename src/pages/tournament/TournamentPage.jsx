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

  const navigate = useNavigate();
  const {user} = useContext(AuthContext);

  const getTournamentInfo = async () => {
    const tournamentInfo = await axios.get(`http://localhost:5005/tournaments/${id}`);
    setTournament(await tournamentInfo.data.tournament);
    setParticipants(await tournamentInfo.data.participants); 
    checkParticipation();
    setLoadingDetails(false);
  }

  const addParticipant = async () => {
    try {
      await axios.post(`http://localhost:5005/tournaments/updateparticipants/${id}`, {user: user})
      getTournamentInfo();
    } catch(error) {
      console.log("Error adding participant: ", error);
      if (error.response.status === 403) {
        setErrorMessage(error.response.data);
      }
    }
  }

  const checkParticipation = () => {
    if (participants.find(participant => participant.username === user.username)) {
      setAlreadyParticipating(true);
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

  useEffect(() => {
    checkParticipation();
  }, [participants])

  useEffect(() => {
    getTournamentInfo();
  }, [])

  return loadingDetails ? <div>Loading ...</div> : (
    <div className="landing-font">
    <DeleteConfirmPopup value={{deleteConfirmed, aboutToDelete, setAboutToDelete}}/>
    {user.username === participants[0].username && 
    <div className="tournament-card-btn-ctn">
      <button className="tournament-card-edit" type="button" onClick={handleEditClick}>Edit Tournament</button> 
      <button className="tournament-card-delete" type="button" onClick={() => setAboutToDelete(true)}>Delete Tournament</button>
    </div>}

    <h1 className="tournament-card-title">{tournament.name}</h1>
    {errorMessage !== "" && <div className="form-error-message">{errorMessage}</div>}
    <div className="tournament-card"> 
      <div className="tournament-card-section">
        <h3>Participants</h3>
        <span>Slots filled: {tournament.participants.length + 1} {tournament.maxParticipants && <span>/ {tournament.maxParticipants}</span>}</span>
        {tournament.minParticipants && <span>Minimum needed: {tournament.minParticipants}</span>}
        <ul className="tournament-card-participant-list">
          {participants.map((participant, index) => <li key={participant.id}><Link to={`/profile/${participant.id}`}>{participant.username}</Link>{index === 0 && <span>👑</span>}</li>)}
          {(user.username !== participants[0].username && !alreadyParticipating && tournament.participants.length + 1 < tournament.maxParticipants) && <button type="button" onClick={addParticipant}>Participate!</button>}
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
          <ul>
            <li>Challenge about: {tournament.challenge}</li>
            <li>Type: {tournament.type}</li>
            <li>Where: {tournament.locationCity ? <span>{tournament.locationCity}, </span> : <></>}{tournament.locationCountry}</li>
            {tournament.reward && <li>Reward: <span>{tournament.reward}</span></li>}
            {tournament.mapUrl && <li>Map:<br/><Link to={tournament.mapUrl}>{tournament.mapUrl}</Link></li>}
            {tournament.updatePlatformUrl && <li>Connect:<br/><Link to={tournament.updatePlatformUrl}>{tournament.updatePlatformUrl}</Link></li>}
          </ul>
        </div>
      </div>
    </div>
    </div>
  )
}

export default TournamentPage