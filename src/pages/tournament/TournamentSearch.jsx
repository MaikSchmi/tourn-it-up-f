import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

function TournamentSearch() {
const [tournaments, setTournaments] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [search, setSearch] = useState("");
const [searchResults, setSearchResults] = useState([]);

const [searchParams] = useSearchParams();

const getTournaments = async () => {
  const allTournaments = await axios.get(`http://localhost:5005/tournaments/all`);
  setTournaments(allTournaments.data);
  setIsLoading(false);
}

const searchTournament = async () => {

}

useEffect(() => {
  setSearchResults([...tournaments].filter((tournament => tournament.name.includes(search))))
}, [tournaments])

useEffect(() => {
  getTournaments();
}, [search])

useEffect(() => {
  setSearch(searchParams.get("q"))
}, [])


  return (
    <div className="tournament-search-main-ctn">
      <div className="tournament-search-ctn">
      {isLoading ? <div>Loading details...</div> : 
        <div className="home-search-ctn">
          <input list="tournament-list" type="text" value={search} onChange={(e) => setSearch(e.target.value)} /><button className="home-create-tournament-btn" type="button" onClick={searchTournament}>Search</button>
          <datalist id="tournament-list">
            {tournaments.map((result) => {
              return (
                <option key={result._id}>{result.name}</option>
              )
            })}
          </datalist>
        </div>}
        {(!isLoading && searchResults.length) ? 
        <ul>
        {searchResults.map((result) => {
          return (
            <li>{result.name}</li>
          )
          })}
        </ul> : <div>No results for your search: {search}</div>}
      </div>
    </div>
  )
}

export default TournamentSearch
