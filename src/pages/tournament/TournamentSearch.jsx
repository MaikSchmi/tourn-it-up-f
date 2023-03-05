import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

function TournamentSearch() {
const [tournaments, setTournaments] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [search, setSearch] = useState("");
const [searchResults, setSearchResults] = useState([]);

const [searchParams] = useSearchParams();
const navigate = useNavigate()

const getTournaments = async () => {
  const allTournaments = await axios.get(`http://localhost:5005/tournaments/all`);
  setTournaments(allTournaments.data);
  setIsLoading(false);
}

useEffect(() => {
  setSearchResults([...tournaments].filter((tournament => tournament.name.includes(search) || tournament.challenge.includes(search))))
}, [tournaments])

useEffect(() => {
  getTournaments();
  searchParams.append("q", search);
  navigate(`/tournaments/search?q=${search}`);
}, [search])

useEffect(() => {
  setSearch(searchParams.get("q"))
  console.log(searchParams.get("q"));
}, [])


  return (
    <div className="tournament-search-main-ctn landing-font">
      <div className="tournament-search-ctn">
      {isLoading ? <div>Loading details...</div> : 
        <div className="tournament-search-bar-ctn">
          <input list="tournament-list" className="landing-font" placeholder="Tournament name / challenge" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
          <datalist id="tournament-list">
            {tournaments.map((result) => {
              return (
                <option key={result._id}>{result.name}</option>
              )
            })}
          </datalist>
          <h3>Results</h3>
          <p>Displaying {searchResults.length} results out of {tournaments.length} Tournaments</p>
        </div>}
        {(!isLoading && searchResults.length) ? 
        <div className="tournament-search-result-ctn">
        {searchResults.map((result) => {
          return (
            <Link to={`/tournaments/${result._id}`} className="tournament-search-result-link"><ul key={result._id}>
              <li style={{paddingBottom: "15px", textAlign: "center"}}>{result.name}</li>
              <li className={result.status === "Ended" ? "status-ended" : result.status === "Closed" ? "status-closed" : result.status === "Open" ? "status-open" : ""}>{result.status}</li>
              <li>Challenge: {result.challenge}</li>
              {(result.maxParticipants > 0 && result.minParticipants > 0) ? <li>Free slots: {result.minParticipants} / {result.maxParticipants}</li> : <li>No participant limit!</li>}
              <li>From: {result.startDate.slice(0, 10)}</li>
              <li>To: {result.endDate.slice(0, 10)}</li>
            </ul></Link>
          )
          })}
        </div> : <div>No results for your search: {search}</div>}
      </div>
    </div>
  )
}

export default TournamentSearch
