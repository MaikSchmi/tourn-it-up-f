import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function Home() {
  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTournaments = async () => {
    try {
      const allTournaments = await axios.get(`http://localhost:5005/tournaments/all`);
      setTournaments(allTournaments.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching tournaments: ", error);
    }
  }

  useEffect(() => {
    getTournaments();
  }, [])

  useEffect(() => {
    console.log(tournaments)
  }, [tournaments])

  return (
    <>
      <div className="home-ctn landing-font">
        <h1>TournItUp - Tournaments</h1>
        <div className="home-top-ctn">
          <section>
            <h2>Your upcoming Tournaments</h2>
            {isLoading ? <div>Loading details...</div> : 
            <div>
              Content
              Content
            </div>}
          </section>
          <section>
            <h2>Search for Tournaments</h2>
            {isLoading ? <div>Loading details...</div> : 
            <div>
              Content
              Content
            </div>}
          </section>
          <section>
            <h2>Create a Tournament</h2>
            <div>
              <Link to="/tournaments/create">Go to Tournament Creation</Link>
            </div>
          </section>
        </div>
        <div className="home-bottom-ctn">
          <section>
            <h3>Past Tournaments</h3>
            {isLoading ? <div>Loading details...</div> : 
            <div>
              Content
              Content
            </div>}
          </section>
          <section>
            <h3>Tournaments that might interest you</h3>
            {isLoading ? <div>Loading details...</div> : 
            <div>
              <ul>
              {tournaments.map((tournament) => {
                return (
                  <li key={tournament._id}><Link to={`/tournaments/${tournament._id}`}>{tournament.name}</Link> <br/> {tournament.challenge}</li>
                )
                })}
              </ul>
            </div>}
          </section>
        </div>
      </div>
    </>
  )
}

export default Home
