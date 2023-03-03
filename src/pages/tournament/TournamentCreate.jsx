import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth.context';
import hobbies from "../../hobbies.json";

function TournamentCreate() {
  const [hobbyList, setHobbyList] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
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
  const [media, setMedia] = useState(undefined);
  const [tasChecked, setTasChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageArr, setErrorMessageArr] = useState()

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
    const cityData = countryData.data.data.filter(country => country.country === locationCountry);
    const cityList = cityData[0].cities.map((city) => city)
    setCities(cityList);
  }

  const handleFormSubmit = async (e) => {+
    e.preventDefault();
/*     if (endDate < startDate) {
      console.log(errorMessageArr.eType);
    } */


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
      media,
      tasChecked
    }
    console.log(formDetails)
  }

  useEffect(() => {
    const cityField = document.querySelector("#city-group");
    if (locationCountry !== "Virtual" && locationCountry !== "") {
      cityField.classList.remove("form-hidden")
      getCities();
    } else {
      cityField.classList.add("form-hidden");
    }
  }, [locationCountry])

  useEffect(() => {
/*     if (endDate < startDate) {
      console.log(errorMessageArr);
    } else {
      console.log(errorMessageArr);
    } */
  }, [endDate])

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
    // Set errorMessageArr
    setErrorMessageArr(
      {
        eName: "", 
        eType: "", 
        eChallenge: "", 
        eDescription: "", 
        eLocationCountry: "", 
        eStartDate: "", 
        eEndDate: "", 
        eDateMatch: "", 
        eTasChecked: ""
      }
    )
    console.log(errorMessageArr)
  }, [])

  return (
    <div className="tournament-create-frm-ctn">
      <h1>Create a Tournament</h1>
      <form className="tournament-create-frm" onSubmit={handleFormSubmit} >
        <div className="tournament-create-form-field-ctn">
            <label>Tournament Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="tournament-create-form-subgroup-ctn">
            <div className="tournament-create-form-subgroup">
              <label>Challenge type:</label>
              <select value={type} onChange={(e) => setType(e.target.value)}><option>Cooperative</option><option>Competition</option></select>
            </div>
            <div className="tournament-create-form-subgroup">
              <label>Challenge in:</label>
              <input type="text" list="hobbies" value={challenge} onChange={(e) => setChallenge(e.target.value)}/>
              <datalist id="hobbies" >
                {hobbyList.map((hobby, index) => <option key={index}>{hobby}</option>)}
              </datalist>
            </div>
        </div>
        <div className="tournament-create-form-field-ctn">
            <label>Organizer:</label>
            <input type="text" value={user.username} readOnly />
        </div>
        <div className="tournament-create-form-field-ctn">
            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} cols="30" rows="20"></textarea>
        </div>
        <div className="tournament-create-form-field-ctn">
            <label>Reward (optional):</label>
            <input type="text" value={reward} onChange={(e) => setReward(e.target.value)} />
        </div>
        <div className="tournament-create-form-subgroup-ctn">
            <div className="tournament-create-form-subgroup">
              <label>Location:</label>
              <input type="text" list="country" value={locationCountry} onChange={(e) => setLocationCountry(e.target.value)} />
              <datalist id="country">
                {countries.map((country, index) => <option key={index}>{country}</option>)}
              </datalist>
            </div>
            <div className="tournament-create-form-subgroup form-hidden" id="city-group">
              <label>City:</label>
              <input type="text" list="city" value={locationCity} onChange={(e) => setLocationCities(e.target.value)} />
              <datalist id="city">
                {cities.map((city, index) => <option key={index}>{city}</option>)}
              </datalist>
            </div>
        </div>
        {/* {(errorMessageArr.eDateMatch !== "" && errorMessageArr.eDateMatch === "End date") ? <span className="form-error-message">{errorMessageArr.eDateMatch}</span> : <></>} */}
        <div className="tournament-create-form-subgroup-ctn">
            <div className="tournament-create-form-subgroup">
              <label>Start Date / Time:</label>
              <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="tournament-create-form-subgroup">
              <label>End Date / Time:</label>
              <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
        </div>
        <div className="tournament-create-form-field-ctn">
            <label>Additional Information:</label>
            <textarea cols="30" rows="3" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} ></textarea>
        </div>
        <div className="tournament-create-form-field-ctn">
            <label>Photos / Videos:</label>
            <input type="file" multiple="multiple" value={media} onChange={(e) => setMedia(e.target.value)} />
        </div>
        <div>
          <input type="checkbox" value={tasChecked} onChange={(e) => setTasChecked(e.target.checked)} /><span className="small-print">By checking this box I confirm that I have read and agree to the <Link>Terms and Conditions</Link> stated therein and that the tournament conditions as provided in the above form comply with the <Link>Code of Conduct</Link> as outlined.</span>
        </div>
        <div className="tournament-create-form-field-ctn">
          <button type="submit">Create Tournament</button>
        </div>
      </form>
    </div>
  )
}

export default TournamentCreate
