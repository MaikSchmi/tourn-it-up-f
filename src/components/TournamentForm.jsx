import React from 'react'

function TournamentForm() {
  return (
    <div className="tournament-create-frm-ctn">
      <h1>Create a Tournament</h1>
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
              <input id="maps-link" type="text" value={mapUrl} onChange={(e) => setMapUrl(e.target.value)} />
            </div>
            <div className="tournament-create-form-subgroup">
              <label htmlFor="update-platform-link">Link to Update Platform:</label>
              <input id="update-platform-link" type="text" value={updatePlatformUrl} onChange={(e) => setupdatePlatformUrl(e.target.value)} />
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
          <button type="submit">Create Tournament</button>
        </div>
      </form>
    </div>
  )
}

export default TournamentForm
