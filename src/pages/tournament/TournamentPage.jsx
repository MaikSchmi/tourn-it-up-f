import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function TournamentPage() {
  const {id} = useParams("id");
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [tournament, setTournament] = useState({});
  const [participants, setParticipants] = useState([]);

  const getTournamentInfo = async () => {
    const tournamentInfo = await axios.get(`http://localhost:5005/tournaments/${id}`);
    setTournament(await tournamentInfo.data.tournament);
    setParticipants(await tournamentInfo.data.participants);
    setLoadingDetails(false);
  }

  useEffect(() => {
    getTournamentInfo();
  }, [])

  return loadingDetails ? <div>Loading ...</div> : (
    <div className="landing-font">
    <h1 className="tournament-card-title">{tournament.name}</h1>
    <div className="tournament-card"> 
      <div className="tournament-card-section">
        <h3>Participants</h3>
        <ul className="tournament-card-participant-list">
          {participants.map((participant) => <li key={participant.id}><Link to={`/profile/${participant.id}`}>{participant.username}</Link></li>)}
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
            <li>Type: {tournament.type}</li>
            <li>Where: {tournament.locationCountry}</li>
            {tournament.locationCity && <li>In: <span>{tournament.locationCity}</span></li>}
            {tournament.mapUrl && <li>Map: <Link to={tournament.mapUrl}>{tournament.mapUrl}</Link></li>}
            {tournament.updatePlatformUrl && <li>Connect: <Link to={tournament.updatePlatformUrl}>{tournament.updatePlatformUrl}</Link></li>}
            {tournament.reward && <li>Reward: <span>{tournament.reward}</span></li>}
          </ul>
        </div>
      </div>
    </div>
    </div>
  )
}

export default TournamentPage