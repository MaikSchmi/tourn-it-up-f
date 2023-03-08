import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Dates from '../../components/Dates';
import SortArrow from '../../components/SortArrow';
import { AuthContext } from '../../contexts/Auth.context';

function TournamentSearch() {
  const [tournaments, setTournaments] = useState([]);
  const [localIsLoading, localSetIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsCount, setSearchResultsCount] = useState(0);
  const [showFilter, setShowFilter] = useState(false);

  const [allFilters, setAllFilters] = useState({});
  const [filterCheckOpen, setFilterCheckOpen] = useState(true);
  const [filterCheckClosed, setFilterCheckClosed] = useState(true);
  const [filterCheckEnded, setFilterCheckEnded] = useState(false);
  const [filterCheckParticipating, setFilterCheckParticipating] = useState(true);
  const [filterCheckOrganizer, setFilterCheckOrganizer] = useState(true);
  const [filterCheckProfessionsRequired, setFilterCheckProfessionsRequired] = useState(false);
  const [sortBy, setSortBy] = useState("")

  const { user, isLoading, isAuthenticated } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()

  const filters = {
    statusOpen: true,
    statusClosed: true,
    statusEnded: false,
    isParticipating: true,
    isOrganizer: true,
    hasProfessionsRequired: false,
  }

  const getTournaments = async () => {
    const allTournaments = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/tournaments/all`);
    setTournaments(allTournaments.data);
    localSetIsLoading(false);
  }

  const toggleFilter = () => {
    !showFilter ? setShowFilter(true) : setShowFilter(false);
  }

  const handleCheckBoxTick = () => {  
    filters.statusOpen = filterCheckOpen,
    filters.statusClosed = filterCheckClosed,
    filters.statusEnded = filterCheckEnded,
    filters.isParticipating = filterCheckParticipating,
    filters.isOrganizer = filterCheckOrganizer,
    filters.hasProfessionsRequired = filterCheckProfessionsRequired,
    setAllFilters(filters);
  }

  useEffect(() => {
    setSearchResults([...tournaments].filter((tournament => tournament.name.includes(search) || tournament.challenge.includes(search) || tournament.locationCountry.includes(search) || tournament.locationCity.includes(search))))
    setSearchResultsCount(searchResults.length)
  }, [tournaments])

  useEffect(() => {
    getTournaments();
    searchParams.append("q", search);
    navigate(`/tournaments/search?q=${search}`);
  }, [search])

  useEffect(() => {
    handleCheckBoxTick();
  }, [filterCheckOpen,filterCheckClosed,filterCheckEnded,filterCheckParticipating,filterCheckOrganizer,filterCheckProfessionsRequired])

  useEffect(() => {
    const filteredResults = document.getElementsByClassName("res");
    setSearchResultsCount(filteredResults.length);
  }, [filters])

  useEffect(() => {
    setSearch(searchParams.get("q"))
    setAllFilters(filters);
  }, [])

  return (
    <div className="tournament-search-main-ctn landing-font bg-image">
      <div className="tournament-search-ctn">
      <h1>Search</h1>
      {localIsLoading ? <div>Loading details...</div> : 
        <div className="tournament-search-bar-ctn">
          <input list="tournament-list" className="landing-font" placeholder="Tournament name / challenge / city / country" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        <div>
          <button type="button" onClick={toggleFilter} className="tournament-card-add-file">Sort & Filter</button>
        </div>
          <datalist id="tournament-list">
            {tournaments.map((result) => {
              return (
                <option key={result._id}>{result.name}</option>
                )
              })}
          </datalist>
        </div>}
        {showFilter && 
        <div className="tournament-search-filter-ctn">
          <div className="tournament-search-filter">
            <div className="tournament-search-filter-option-w-sub-ctn">
              <div className="tournament-search-filter-option-ctn-sub">
              <h4>Filter:</h4>
                <label>
                  <input type="checkbox" checked={filterCheckOpen} onChange={(e) => setFilterCheckOpen(e.target.checked)} />Open
                </label>
                <label>
                  <input type="checkbox" checked={filterCheckClosed} onChange={(e) => setFilterCheckClosed(e.target.checked)} />Closed
                </label>
                <label>
                  <input type="checkbox" checked={filterCheckEnded} onChange={(e) => setFilterCheckEnded(e.target.checked)} />Ended
                </label>
              </div>
              <div className="tournament-search-filter-option-ctn-sub">
              <h4 style={{visibility: "hidden"}}>Filter:</h4>
                <label>
                  <input type="checkbox" checked={filterCheckParticipating} onChange={(e) => setFilterCheckParticipating(e.target.checked)} />Joined
                </label>
                <label>
                  <input type="checkbox" checked={filterCheckOrganizer} onChange={(e) => setFilterCheckOrganizer(e.target.checked)} />Host
                </label>
                <label>
                  <input type="checkbox" checked={filterCheckProfessionsRequired} onChange={(e) => setFilterCheckProfessionsRequired(e.target.checked)} />Prof. Req.
                </label>
              </div>
            </div>
            <div className="tournament-search-filter-option-w-sub-ctn">
              <div className="tournament-search-filter-option-ctn-sub">
              <h4>Sort:</h4>
                <label>
                  <button type="button" className="tournament-search-filter-btn landing-font" onClick={() => setSortBy(sortBy === "free asc" ? "free desc" : "free asc")}>Free Slots</button> <SortArrow props={sortBy} index={0} ><>&uArr;&dArr;</></SortArrow>
                </label>
                <label>
                  <button type="button" className="tournament-search-filter-btn landing-font" onClick={() => setSortBy(sortBy === "min asc" ? "min desc" : "min asc")}>Min participants</button> <SortArrow props={sortBy} index={1} ><>&uArr;&dArr;</></SortArrow>
                </label>
                <label>
                  <button type="button" className="tournament-search-filter-btn landing-font" onClick={() => setSortBy(sortBy === "max asc" ? "max desc" : "max asc")}>Max participants</button> <SortArrow props={sortBy} index={2} ><>&uArr;&dArr;</></SortArrow>
                </label>
              </div>
              <div className="tournament-search-filter-option-ctn-sub">
                <h4 style={{visibility: "hidden"}}>Sort:</h4>
                <label>
                  <button type="button" className="tournament-search-filter-btn landing-font" onClick={() => setSortBy(sortBy === "alph asc" ? "alph desc" : "alph asc")}>Alphabetically</button> <SortArrow props={sortBy} index={3} ><>&uArr;&dArr;</></SortArrow>
                </label>
                <label>
                  <button type="button" className="tournament-search-filter-btn landing-font" onClick={() => setSortBy(sortBy === "start asc" ? "start desc" : "start asc")}>Start Date</button> <SortArrow props={sortBy} index={4} ><>&uArr;&dArr;</></SortArrow>
                </label>
                <label>
                  <button type="button" className="tournament-search-filter-btn landing-font" onClick={() => setSortBy(sortBy === "end asc" ? "end desc" : "end asc")}>End Date</button> <SortArrow props={sortBy} index={5} ><>&uArr;&dArr;</></SortArrow>
                </label>
              </div>
            </div>
          </div>
        </div>
        }
        <div className="search-result-header">
          <h3>Results</h3>
          <p>Displaying {searchResultsCount} results out of {tournaments.length} Tournaments</p>
        </div>
        {(!localIsLoading && !isLoading && searchResults.length) ? 
        <div className="tournament-search-result-ctn">
        {searchResults
        .filter((result) => {
          return (
            allFilters.statusOpen && result.status === "Open" || 
            allFilters.statusClosed && result.status === "Closed" || 
            allFilters.statusEnded && result.status === "Ended" ||
            (isAuthenticated && allFilters.isOrganizer && result.organizer.username === user.username) ||
            allFilters.hasProfessionsRequired && result.professionsRequired ||
            (isAuthenticated && allFilters.isParticipating && result.participants.some(participant => participant.username === user.username))
          )
        })
        .sort((a, b) => {
          return (
            sortBy === "max asc" && (a.maxParticipants - b.maxParticipants) || sortBy === "max desc" && (b.maxParticipants - a.maxParticipants) ||
            sortBy === "min asc" && (a.minParticipants - b.minParticipants) || sortBy === "min desc" && (b.minParticipants - a.minParticipants) ||
            sortBy === "free asc" && ((a.maxParticipants - a.participants.length + 1) - (b.maxParticipants - b.participants.length + 1)) || sortBy === "free desc" && ((b.maxParticipants - b.participants.length + 1) - (a.maxParticipants - a.participants.length + 1)) ||
            sortBy === "alph asc" && (a.name.localeCompare(b.name)) || sortBy === "alph desc" && (b.name.localeCompare(a.name)) ||
            sortBy === "start asc" && new Date(a.startDate.split("T")[0]) - new Date(b.startDate.split("T")[0]) || sortBy === "start desc" && new Date(b.startDate.split("T")[0]) - new Date(a.startDate.split("T")[0]) ||
            sortBy === "end asc" && new Date(a.endDate.split("T")[0]) - new Date(b.endDate.split("T")[0]) || sortBy === "end desc" && new Date(b.endDate.split("T")[0]) - new Date(a.endDate.split("T")[0])
          )
        })
        .map((result) => {
          return (
            <Link to={`/tournaments/${result._id}`} className="tournament-search-result-link res" key={result._id}>
              <ul style={{backgroundImage: result.backgroundImage ? `url(${result.backgroundImage})` : "", backgroundSize: "415px", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundColor: result.backgroundColor !== "#00000000" && result.backgroundColor.slice(0, 7)+"FF"}}>
                {(isAuthenticated && result.organizer.username === user.username) && <li style={{alignSelf: "center"}}>👑</li>}
                <li style={{padding: "5px", textAlign: "center", color: result.textColor, backgroundColor: result.backgroundColor.slice(0, 7) + "FF"}}>{result.name}</li>
                <li className={result.status === "Ended" ? "status-ended" : result.status === "Closed" ? "status-closed" : result.status === "Open" ? "status-open" : ""}>{result.status}</li>
                <li>Challenge: {result.challenge}</li>
                {(result.maxParticipants > 0 && result.minParticipants > 0) ? <li>Free slots: {result.minParticipants} / {result.maxParticipants}</li> : <li>No participant limit!</li>}
                <li>-</li>
                <li>From: <Dates>{result.startDate}</Dates></li>
                <li>To: <Dates>{result.endDate}</Dates></li>
              </ul>
            </Link>
          )
          })}
        </div> : <div>No results for your search: {search}</div>}
      </div>
    </div>
  )
}

export default TournamentSearch
