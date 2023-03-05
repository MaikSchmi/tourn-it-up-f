import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/Auth.context';


function Home() {
  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  const getTournaments = async () => {
    try {
      const allTournaments = await axios.get(`http://localhost:5005/tournaments/all`);
      setTournaments(allTournaments.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching tournaments: ", error);
    }
  }

  const searchTournament = async (e) => {
    try {
      const foundTournament = await axios.get(`http://localhost:5005/tournaments/name/${search}`);
      console.log(foundTournament)
      navigate(`/tournaments/${foundTournament.data.tournament._id}`)
    } catch (error) {
      if (error.response.status === 404) navigate(`/tournaments/search?q=${search}`);
    }
  }

  useEffect(() => {
    getTournaments();
  }, [])

  useEffect(() => {
    setSearchResult([...tournaments].filter((tournament) => tournament.name.includes(search)));
  }, [search])

  useEffect(() => {
    if (tournaments.status === "Open") {
      setStatusState("status-format status-open");
    } else if (tournaments.status === "Closed") {
      setStatusState("status-format status-closed");
    } else if (tournaments.status === "Ended") {
      setStatusState("status-format status-ended");
    }
  }, [tournaments])

  return (
    <>
      <div className="home-ctn landing-font">
        <h1>TournItUp - Tournaments</h1>
        <div className="home-top-ctn">
          <h2>Your upcoming Tournaments</h2>
          <section>
            {isLoading ? <div>Loading details...</div> : 
            <div>
              <ul>
              {tournaments.filter((tournament) => (tournament.organizer.username === user.username && tournament.status !== "Ended")).length ? tournaments.filter((tournament) => (tournament.organizer.username === user.username && tournament.status !== "Ended")).map((tournament) => {
                return (
                  <li key={tournament._id}><Link to={`/tournaments/${tournament._id}`}>{tournament.name} 👑</Link> <br/> {tournament.challenge} - <span className={tournament.status === "Open" ? "status-open" : tournament.status === "Closed" ? "status-closed" : tournament.status === "Ended" ? "status-ended" : ""}>{tournament.status}</span></li>
                )
                }) : <div>No upcoming Tournaments, sign up for some!</div>}
              </ul>
            </div>}
          </section>
          <h2>Search for Tournaments</h2>
          <section>
            {isLoading ? <div>Loading details...</div> : 
            <div className="home-search-ctn">
              <input list="tournament-list" type="text" value={search} onChange={(e) => setSearch(e.target.value)} /><button className="home-create-tournament-btn" type="button" onClick={searchTournament}>Search</button>
              <datalist id="tournament-list">
                {searchResult.map((result) => {
                  return (
                    <option key={result._id}>{result.name}</option>
                  )
                })}
              </datalist>
            </div>}
          </section>
          <h2>Create a Tournament</h2>
          <section>
            <div>
              <Link className="home-create-tournament-btn" to="/tournaments/create">Go to Tournament Creation</Link>
            </div>
          </section>
        </div>
        <div className="home-bottom-ctn">
          <div>
            <h3>Past Tournaments</h3>
            <section>
              {isLoading ? <div>Loading details...</div> : 
              <ul>
                {tournaments.filter((tournament) => tournament.status === "Ended").map((tournament) => {
                  return (
                    <li key={tournament._id}><Link to={`/tournaments/${tournament._id}`}>{tournament.name} {tournament.organizer.username === user.username && <>👑</>}</Link> <br/> {tournament.challenge}</li>
                  )
                  })}
              </ul>}
            </section>
          </div>
          <div>
            <h3>Tournaments that might interest you</h3>
            <section>
              {isLoading ? <div>Loading details...</div> : 
              <div>
                <ul>
                {tournaments.map((tournament) => {
                  return (
                    <li key={tournament._id}><Link to={`/tournaments/${tournament._id}`}>{tournament.name} {tournament.organizer.username === user.username && <>👑</>} </Link> <br/> {tournament.challenge} - <span className={tournament.status === "Open" ? "status-open" : tournament.status === "Closed" ? "status-closed" : tournament.status === "Ended" ? "status-ended" : ""}>{tournament.status}</span></li>
                  )
                  })}
                </ul>
              </div>}
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
