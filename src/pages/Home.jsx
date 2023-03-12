import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Dates from '../components/Dates';
import { AuthContext } from '../contexts/Auth.context';


function Home() {
  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const { user, renewToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const getTournaments = async () => {
    try {
      const allTournaments = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/tournaments/all`);
      setTournaments(allTournaments.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching tournaments: ", error);
    }
  }

  const searchTournament = async (e) => {
    e.preventDefault();

    try {
      const foundTournament = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/tournaments/search/find-name/${search}`);
      navigate(`/tournaments/${foundTournament.data.tournament._id}`)
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) navigate(`/tournaments/search?q=${search}`);
    }
  }

  useEffect(() => {
    getTournaments();
    renewToken();
  }, [])

  useEffect(() => {
    setSearchResult([...tournaments].filter((tournament) => tournament.name.toLowerCase().includes(search.toLowerCase())));
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
      <div className="home-ctn landing-font bg-image">
        <h1 style={{textDecoration: "underline"}}>GreatTournaments - Tournaments</h1>
        <div className="home-top-ctn">
          <h2>Your upcoming Tournaments</h2>
          <section>
            {isLoading ? <div style={{height: "20vh"}}>Loading details...</div> : 
            <div className="home-search-result-ctn">
              {tournaments.filter(tournament => user.tournaments.includes(tournament._id) && tournament.status !== "Ended").length ? 
               tournaments.filter(tournament => user.tournaments.includes(tournament._id) && tournament.status !== "Ended").sort((a, b) => new Date(a.startDate) - new Date(b.startDate)).map((tournament) => {
                return (
                  <Link to={`/tournaments/${tournament._id}`} key={tournament._id} className="home-search-result-link">
                      <p>Begins: <Dates>{tournament.startDate}</Dates></p>
                      <ul style={{backgroundImage: tournament.backgroundImage ? `url(${tournament.backgroundImage})` : "", backgroundSize: "415px", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundColor: tournament.backgroundColor !== "#00000000" && tournament.backgroundColor.slice(0, 7)+"FF"}}>
                        <li>"{tournament.name}" {tournament.organizer.username === user.username && <>👑</>} <br/> {tournament.challenge}-challenge - <span className={tournament.status === "Open" ? "status-open" : tournament.status === "Closed" ? "status-closed" : ""}>{tournament.status}</span></li>
                      </ul>
                  </Link>
                )
            }) : <><div>You are not registered for any upcoming tournaments.</div><Link to="/tournaments/search?">Why not take a look at some?</Link></>}
            </div>}
          </section>
          <h2>Search for Tournaments</h2>
          <section>
            {isLoading ? <div style={{height: "20vh"}}>Loading details...</div> : 
            <div className="home-search-ctn">
              <form onSubmit={searchTournament}>
                <input list="tournament-list" type="text" value={search} onChange={(e) => setSearch(e.target.value)} /><button className="home-create-tournament-btn" type="submit">Search</button>
              </form>
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
              {(user.status === "Paid Member" || user.status === "Premium Member") ? <Link className="home-create-tournament-btn" to="/tournaments/create">Go to Tournament Creation</Link> : <Link className="home-create-tournament-btn" to="/membership-options">See Membership Options</Link>}
            </div>
          </section>
        </div>
        <div className="home-bottom-ctn">
          <div>
            <h3>Past Tournaments</h3>
            <section className="home-bottom-sections">
              <div className="home-search-result-ctn">
              {isLoading ? <div style={{height: "20vh"}}>Loading details...</div> : 
                tournaments.filter((tournament) => tournament.status === "Ended").length ?
                tournaments.filter((tournament) => tournament.status === "Ended").map((tournament) => {
                  return (
                    <Link to={`/tournaments/${tournament._id}`} key={tournament._id} className="home-search-result-link home-search-result-fill">
                      <ul style={{backgroundImage: tournament.backgroundImage ? `url(${tournament.backgroundImage})` : "", backgroundSize: "415px", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundColor: tournament.backgroundColor !== "#00000000" && tournament.backgroundColor.slice(0, 7)+"FF"}}>
                        <li>"{tournament.name}" {tournament.organizer.username === user.username && <>👑</>} <br/> {tournament.challenge}-challenge</li>
                      </ul>
                    </Link>
                  )}) : <div>Nothing to display!</div>}
              </div>
            </section>
          </div>
          <div>
            <h3>Interesting for you</h3>
            <section className="home-bottom-sections">
              {isLoading ? <div style={{height: "20vh"}}>Loading details...</div> : 
              <div className="home-search-result-ctn ">
                {tournaments.filter((tournament) => user.interest.some(interest => interest === tournament.challenge)).length ?
                tournaments.filter((tournament) => user.interest.some(interest => interest === tournament.challenge)).map((tournament) => {
                  return (
                    <Link to={`/tournaments/${tournament._id}`} key={tournament._id} className="home-search-result-link home-search-result-fill">
                      <ul style={{backgroundImage: tournament.backgroundImage ? `url(${tournament.backgroundImage})` : "", backgroundSize: "415px", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundColor: tournament.backgroundColor !== "#00000000" && tournament.backgroundColor.slice(0, 7)+"FF"}}>
                        <li>"{tournament.name}" {tournament.organizer.username === user.username && <>👑</>} <br/> {tournament.challenge}-challenge - <span className={tournament.status === "Open" ? "status-open" : tournament.status === "Closed" ? "status-closed" : tournament.status === "Ended" ? "status-ended" : ""}>{tournament.status}</span></li> 
                      </ul>
                    </Link>
                  )}) : <><div>No tournaments taking place that match your interest.</div> <Link to={user.status !== "Member" ? "/tournaments/create" : "/membership-options"}>Consider organizing your own!</Link></>}
              </div>}
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
