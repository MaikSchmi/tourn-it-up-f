import axios from 'axios';
import React, { createElement, useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth.context';
import hobbies from "../../hobbies.json";
import { v4 } from "uuid";
import InputField from '../../components/InputField';

function TournamentUpdate() {
    const [hobbyList, setHobbyList] = useState([]);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [loadingDetails, setLoadingDetails] = useState(true)
    const { user } = useContext(AuthContext);
    
    const [name, setName] = useState("");
    const [type, setType] = useState("Cooperative");
    const [challenge, setChallenge] = useState("");
    const [description, setDescription] = useState(``);
    const [reward, setReward] = useState("");
    const [locationCountry, setLocationCountry] = useState("");
    const [locationCity, setLocationCities] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState(``);
    const [mapUrl, setMapUrl] = useState(``);
    const [updatePlatformUrl, setupdatePlatformUrl] = useState(``);
    const [tosChecked, setTosChecked] = useState(false);
    const [minParticipants, setMinParticipants] = useState(0);
    const [maxParticipants, setMaxParticipants] = useState(0);
    const [professionsRequired, setProfessionsRequired] = useState(false);
    const [professions, setProfessions] = useState([])
  
    const [submitError, setSubmitError] = useState("");
    const [errName, setErrName] = useState("");
    const [errChallenge, setErrChallenge] = useState("");
    const [errDescription, setErrDescription] = useState("");
    const [errLocation, setErrLocation] = useState("");
    const [errStartDate, setErrStartDate] = useState("");
    const [errEndDate, setErrEndDate] = useState("");
    const [errDateMatch, setErrDateMatch] = useState("");
    const [errTosChecked, setErrTosChecked] = useState("");
    const [errMaxMin, setErrMaxMin] = useState("");
  
    const {id} = useParams("id");
    const navigate = useNavigate();
  
    const getTournamentInfo = async () => {
      const tournamentInfo = await axios.get(`${import.meta.env.BASE_URL_API}/tournaments/${id}`);

      setName(tournamentInfo.data.tournament.name)
      setType(tournamentInfo.data.tournament.type)
      setChallenge(tournamentInfo.data.tournament.challenge)
      setDescription(tournamentInfo.data.tournament.description)
      setReward(tournamentInfo.data.tournament.reward)
      setLocationCountry(tournamentInfo.data.tournament.locationCountry)
      setLocationCities(tournamentInfo.data.tournament.locationCity)
      setStartDate(tournamentInfo.data.tournament.startDate)
      setEndDate(tournamentInfo.data.tournament.endDate)
      setAdditionalInfo(tournamentInfo.data.tournament.additionalInfo)
      setMapUrl(tournamentInfo.data.tournament.mapUrl)
      setupdatePlatformUrl(tournamentInfo.data.tournament.updatePlatformUrl)
      setMinParticipants(tournamentInfo.data.tournament.minParticipants)
      setMaxParticipants(tournamentInfo.data.tournament.maxParticipants)
      setProfessionsRequired(tournamentInfo.data.tournament.professionsRequired)
      setProfessions(tournamentInfo.data.tournament.professions)
      setLoadingDetails(false);
    }

    const getCountries = async () => {
      // Fill Country List
      const countryData = await axios.get("https://countriesnow.space/api/v0.1/countries");
      const countryList = countryData.data.data.map((country) => country.country)
      countryList.unshift("Virtual")
      setCountries(countryList);
    }
  
    const getCities = async () => {
      // Fill City List
      const countryData = await axios.get("https://countriesnow.space/api/v0.1/countries");
      const cityData = await countryData.data.data.filter(country => country.country === locationCountry);
      const cityList = await cityData[0].cities.map((city) => city)
      setCities(cityList);
    }
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
  
      // Error Message Handling
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      today = yyyy + "-" + mm + "-" + dd;

      endDate < startDate ? setErrDateMatch("The start date needs to be before the end date.") : startDate <= today ? setErrDateMatch("The start date needs to be in the future") : setErrDateMatch("");
      name === "" ? setErrName("Please indicate a name for the Tournament.") : setErrName("");
      challenge === "" ? setErrChallenge("Please indicate a challenge.") : setErrChallenge("");
      description === "" ? setErrDescription("Please enter a description.") : setErrDescription("");
      locationCountry === "" ? setErrLocation(`Please provide a location (choose "Virtually" if it's online).`) : setErrLocation("");
      startDate === "" ? setErrStartDate("Please select a start date.") : setErrStartDate("");
      endDate === "" ? setErrEndDate("Please select an end date.") : setErrEndDate("");
      ((maxParticipants > 0 && minParticipants > 0) && maxParticipants < minParticipants) ? setErrMaxMin("Please correct the participant amount.") : setErrMaxMin("");
      !tosChecked ? setErrTosChecked("Please review and accept the Terms of Service and Code of Conduct.") : setErrTosChecked("");
  
      const formDetails = {
          name,
          type,
          challenge,
          organizer: user.username,
          description,
          reward,
          locationCountry,
          locationCity,
          startDate,
          endDate,
          additionalInfo,
          mapUrl,
          updatePlatformUrl,
          minParticipants,
          maxParticipants,
          tosChecked: tosChecked,
        }
      
        try {
          const updatedTournament = await axios.post(`${import.meta.env.BASE_URL_API}/tournaments/update/${id}`, {formDetails})
          const updatedTournamentId = await updatedTournament.data;
          navigate(`/tournaments/${updatedTournamentId}`);
        } catch (error) {
          console.log("CAUGHT ERROR: ", error);
          if (error.response.status === 400) {
            setSubmitError(error.response.data);
          }
        }
    }
  
    const addProfessionInput = () => {
      const inputElement = <InputField/>
      setProfessions(prevProfessions => ([...prevProfessions, inputElement]));
    }
  
    const removeProfessionInputs = () => {
      setProfessions([]);
    }

    // Error Handling
    useEffect(() => {
      name === "" && errName !== "" ? setErrName("Please indicate a name for the Tournament.") : setErrName("");
      challenge === "" && errChallenge !== "" ? setErrChallenge("Please indicate a challenge.") : setErrChallenge("")
      description === "" && errDescription !== "" ? setErrDescription("Please enter a description.") : setErrDescription("")
      locationCountry === "" && errLocation !== "" ? setErrLocation(`Please provide a location (choose "Virtually" if it's online).`) : setErrLocation("")  
      startDate === "" && errStartDate !== "" ? setErrStartDate("Please select a start date.") : setErrStartDate("")
      endDate === "" && errEndDate !== "" ? setErrEndDate("Please select an end date.") : setErrEndDate("")
      !tosChecked && errTosChecked !== "" ? setErrTosChecked("Please review and accept the Terms of Service and Code of Conduct.") : setErrTosChecked("")
    }, [name, challenge, description, locationCountry, startDate, endDate, tosChecked])
  
    useEffect(() => {
      const cityField = document.querySelector("#city-group");
      if (locationCountry !== "Virtual" && locationCountry !== "") {
        !loadingDetails && cityField.classList.remove("form-hidden")
        getCities();
      } else {
        !loadingDetails && cityField.classList.add("form-hidden");
      }
    }, [locationCountry])

    useEffect(() => {
      // Fill Hobby List
      const hobbyArr = [];
      for (let i = 0; i < hobbies.length; i++) {
        hobbyArr.push(JSON.stringify(hobbies[i]).split(`"`)[1])
      } 
      hobbyArr.sort((a, b) => a.localeCompare(b));
      setHobbyList(hobbyArr);
      
      // Fill Country List
      getCountries();

      // Get Tournament information
      getTournamentInfo();
  
    }, [])
  
    return (
      loadingDetails ? <div>Loading...</div> : 
      <div className="tournament-create-frm-ctn bg-image">
        <h1>Update Tournament</h1>
        {submitError !== "" && <span className="form-error-message">{submitError}</span>}
        <form className="tournament-create-frm" onSubmit={handleFormSubmit} >
          <div className="tournament-create-form-field-ctn">
              <label htmlFor="name">Tournament Name:</label>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
              {errName !== "" && <span className="form-error-message">{errName}</span>}
          </div>
          <div className="tournament-create-form-subgroup-ctn">
              <div className="tournament-create-form-subgroup">
                <label htmlFor="challenge">Challenge type:</label>
                <select id="challenge" className="tournament-create-form-select" value={type} onChange={(e) => setType(e.target.value)}><option>Cooperative</option><option>Competition</option></select>
              </div>
              <div className="tournament-create-form-subgroup">
                <label htmlFor="challenge-type">Challenge in:</label>
                <input id="challenge-type" type="text" list="hobbies" value={challenge} onChange={(e) => setChallenge(e.target.value)}/>
                <datalist id="hobbies" >
                  {hobbyList.map((hobby, index) => <option key={index}>{hobby}</option>)}
                </datalist>
                {errChallenge !== "" && <span className="form-error-message">{errChallenge}</span>}
              </div>
          </div>
          <div className="tournament-create-form-field-ctn">
              <label>Organizer:</label>
              <input type="text" value={user.username} readOnly />
          </div>
          <div className="tournament-create-form-box">
            <span>Participants</span><br/>
            <small>(Optional - Leave blank or type "0" if no requirement.)</small>
            <div className="tournament-create-form-subgroup-ctn">
                <div className="tournament-create-form-subgroup">
                  <label htmlFor="min-amount">Min amount:</label>
                  <input type="number" id="min-amount" value={minParticipants > 0 && minParticipants} onChange={(e) => setMinParticipants(e.target.value)} />
                </div>
                <div className="tournament-create-form-subgroup">
                  <label htmlFor="max-amount">Max amount:</label>
                  <input type="number" id="max-amount" value={maxParticipants > 0 && maxParticipants} onChange={(e) => setMaxParticipants(e.target.value)} />
                </div>
            {errMaxMin !== "" && <span className="form-error-message">{errMaxMin}</span>}
            </div>
            <div>
              <input type="checkbox" value={professionsRequired} onChange={(e) => setProfessionsRequired(e.target.checked)} /><span>Professions required</span>
            </div>
            <div id="professions-list" className="tournament-create-form-professions-ctn form-not-loaded">
              <ul id="professions-list-ul">
              <button className="add-profession-button" type="button" onClick={addProfessionInput}>+</button>
                {professions.map((profession) => {
                  return (
                    <li key={v4()}>
                      {profession}
                    </li>
                  )
                })}
                {professions.length ? <button type="button" className="remove-profession-button" onClick={() => removeProfessionInputs()}>Reset</button> : <></>}
              </ul>
            </div>
          </div>
          <div className="tournament-create-form-field-ctn">
              <label htmlFor="description">Description:</label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} cols="30" rows="20"></textarea>
              {errDescription !== "" && <span className="form-error-message">{errDescription}</span>}
          </div>
          <div className="tournament-create-form-field-ctn">
              <label htmlFor="reward">Reward (optional):</label>
              <input id="reward" type="text" value={reward} onChange={(e) => setReward(e.target.value)} />
          </div>
          <div className="tournament-create-form-subgroup-ctn">
              <div className="tournament-create-form-subgroup">
                <label htmlFor="location-country">Location:</label>
                <input id="location-country" type="text" list="country" value={locationCountry} onChange={(e) => setLocationCountry(e.target.value)} />
                <datalist id="country">
                  {countries.map((country, index) => <option key={index}>{country}</option>)}
                </datalist>
                {errLocation !== "" && <span className="form-error-message">{errLocation}</span>}
              </div>
              <div className="tournament-create-form-subgroup form-hidden" id="city-group">
                <label htmlFor="location-city">City:</label>
                <input id="location-city" type="text" list="city" value={locationCity} onChange={(e) => setLocationCities(e.target.value)} />
                <datalist id="city">
                  {cities.map((city, index) => <option key={index}>{city}</option>)}
                </datalist>
              </div>
          </div>
  
          <div className="tournament-create-form-subgroup-ctn">
              <div className="tournament-create-form-subgroup">
                <label htmlFor="maps-link">Maps Link:</label>
                <input id="maps-link" type="url" value={mapUrl} onChange={(e) => setMapUrl(e.target.value)} />
              </div>
              <div className="tournament-create-form-subgroup">
                <label htmlFor="update-platform-link">Link to Update Platform:</label>
                <input id="update-platform-link" type="url" value={updatePlatformUrl} onChange={(e) => setupdatePlatformUrl(e.target.value)} />
            </div>
          </div>
          
          <div className="tournament-create-form-subgroup-ctn">
              <div className="tournament-create-form-subgroup">
                <label htmlFor="start-date">Start Date / Time:</label>
                <input id="start-date" type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              {errStartDate !== "" && <span className="form-error-message">{errStartDate}</span>}
              <div className="tournament-create-form-subgroup">
                <label htmlFor="end-date">End Date / Time:</label>
                <input id="end-date" type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
              {errEndDate !== "" && <span className="form-error-message">{errEndDate}</span>}
              {errDateMatch !== "" && <span className="form-error-message">{errDateMatch}</span>}
          </div>
          <div className="tournament-create-form-field-ctn">
              <label htmlFor="additional-info" >Additional Information:</label>
              <textarea id="additional-info" cols="30" rows="3" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} ></textarea>
          </div>
          <div>
            <input type="checkbox" value={tosChecked} onChange={(e) => setTosChecked(e.target.checked)} /><span className="small-print">By checking this box I confirm that I have read and agree to the <Link>Terms and Conditions</Link> stated therein and that the tournament conditions as provided in the above form comply with the <Link>Code of Conduct</Link> as outlined.</span>
              {errTosChecked !== "" && <span className="form-error-message">{errTosChecked}</span>}
          </div>
          <div className="tournament-create-form-field-ctn">
            <button type="submit">Update Tournament</button>
          </div>
        </form>
      </div>
    )
  }

export default TournamentUpdate
