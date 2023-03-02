import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import hobbies from "../../hobbies.json";

function TournamentCreate() {
  const [hobbyList, setHobbyList] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  
  const [locationCountry, setLocationCountry] = useState("");
  const [locationCity, setLocationCities] = useState("");

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
    // Fill Hobby List
    const hobbyArr = [];
    for (let i = 0; i < hobbies.length; i++) {
      hobbyArr.push(JSON.stringify(hobbies[i]).split(`"`)[1])
    } 
    hobbyArr.sort((a, b) => a.localeCompare(b));
    setHobbyList(hobbyArr);

    // Fill Country List
    getCountries();
  }, [])

  return (
    <div className="tournament-create-frm-ctn">
      <h1>Create a Tournament</h1>
      <form className="tournament-create-frm">
        <div className="tournament-create-form-field-ctn">
            <label>Tournament Name:</label>
            <input type="text"/>
        </div>
        <div className="tournament-create-form-subgroup-ctn">
            <div className="tournament-create-form-subgroup">
              <label>Challenge type:</label>
              <select><option>Joint Effort</option><option>Competition</option></select>
            </div>
            <div className="tournament-create-form-subgroup">
              <label>Challenge in:</label>
              <input type="text" list="hobbies"/>
              <datalist id="hobbies">
                {hobbyList.map((hobby, index) => <option key={index}>{hobby}</option>)}
              </datalist>
            </div>
        </div>
        <div className="tournament-create-form-field-ctn">
            <label>Organizer:</label>
            <input type="text"/>
        </div>
        <div className="tournament-create-form-field-ctn">
            <label>Description:</label>
            <textarea cols="30" rows="20"></textarea>
        </div>
        <div className="tournament-create-form-field-ctn">
            <label>Reward (optional):</label>
            <input type="text"/>
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
        <div className="tournament-create-form-subgroup-ctn">
            <div className="tournament-create-form-subgroup">
              <label>Start Date / Time:</label>
              <input type="datetime-local" />
            </div>
            <div className="tournament-create-form-subgroup">
              <label>End Date / Time:</label>
              <input type="datetime-local" />
            </div>
        </div>
        <div className="tournament-create-form-field-ctn">
            <label>Additional Information:</label>
            <textarea cols="30" rows="3"></textarea>
        </div>
        <div className="tournament-create-form-field-ctn">
            <label>Photos / Videos:</label>
            <input type="file" multiple="multiple" onChange={(e) => console.log(e.target.value)}/>
        </div>
        <div>
          <input type="checkbox" /><span className="small-print">By checking this box I confirm that I have read and agree to the <Link>Terms and Conditions</Link> stated therein and that the tournament conditions as provided in the above form comply with the <Link>Code of Conduct</Link> as outlined.</span>
        </div>
        <div className="tournament-create-form-field-ctn">
          <button type="submit">Create Tournament</button>
        </div>
      </form>
    </div>
  )
}

export default TournamentCreate
