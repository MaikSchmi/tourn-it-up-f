import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth.context';
import interests from "../hobbies.json";


function UpdateInterests() {
  const [interest0, setInterest0] = useState("");
  const [interest1, setInterest1] = useState("");
  const [interest2, setInterest2] = useState("");
  const [interest3, setInterest3] = useState("");
  const [interest4, setInterest4] = useState("");
  const [slogan, setSlogan] = useState("");
  const [interestsList, setInterestsList] = useState([]);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateInterestsInDb = [];

    interest0 !== "" && updateInterestsInDb.push(interest0);
    interest1 !== "" && updateInterestsInDb.push(interest1);
    interest2 !== "" && updateInterestsInDb.push(interest2);
    interest3 !== "" && updateInterestsInDb.push(interest3);
    interest4 !== "" && updateInterestsInDb.push(interest4);

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL_API}/auth/update-interests/${user.username}`, {slogan: slogan, updateInterestsInDb})
      user.interest = updateInterestsInDb;
      navigate("/home");
    } catch (error) {
      console.log("Error updating interests: ", error);
    }
  }

  useEffect(() => {
    if (user) {
      if (user.slogan !== "") {
        setSlogan(user.slogan);
      }
      if (user.interest.length) {
        user.interest[0] !== undefined && setInterest0(user.interest[0])
        user.interest[1] !== undefined && setInterest1(user.interest[1])
        user.interest[2] !== undefined && setInterest2(user.interest[2])
        user.interest[3] !== undefined && setInterest3(user.interest[3])
        user.interest[4] !== undefined && setInterest4(user.interest[4])
      }
    }
  }, [user])

  useEffect(() => {
    // Fill Interests List
    const interestsArr = [];
    for (let i = 0; i < interests.length; i++) {
      interestsArr.push(JSON.stringify(interests[i]).split(`"`)[1])
    } 
    interestsArr.sort((a, b) => a.localeCompare(b));
    setInterestsList(interestsArr);
    
  }, [])

  return (
    <>
      <div className="form-ctn">
        <form onSubmit={handleSubmit} className="form-auth">
          <label>Slogan:</label>
          <input placeholder="e.g. Tournaments Rock!" className="post-signup-inputs" type="text" value={slogan} onChange={(e) => setSlogan(e.target.value)}/>
          
          <label>Interests:</label>
          <div>
          <input placeholder="Interest" className="post-signup-inputs" id="challenge-type" type="text" list="interests" value={interest0} onChange={(e) => setInterest0(e.target.value)}/>
              <datalist id="interests" >
              {interestsList.map((interest, index) => <option key={index}>{interest}</option>)}
              </datalist>
          </div>
          <div>
          <input placeholder="Interest" className="post-signup-inputs" id="challenge-type" type="text" list="interests" value={interest1} onChange={(e) => setInterest1(e.target.value)}/>
              <datalist id="interests" >
              {interestsList.map((interest, index) => <option key={index}>{interest}</option>)}
              </datalist>
          </div>
          <div>
          <input placeholder="Interest" className="post-signup-inputs" id="challenge-type" type="text" list="interests" value={interest2} onChange={(e) => setInterest2(e.target.value)}/>
              <datalist id="interests" >
              {interestsList.map((interest, index) => <option key={index}>{interest}</option>)}
              </datalist>
          </div>
          <div>
          <input placeholder="Interest" className="post-signup-inputs" id="challenge-type" type="text" list="interests" value={interest3} onChange={(e) => setInterest3(e.target.value)}/>
              <datalist id="interests" >
              {interestsList.map((interest, index) => <option key={index}>{interest}</option>)}
              </datalist>
          </div>
          <div>
          <input placeholder="Interest" className="post-signup-inputs" id="challenge-type" type="text" list="interests" value={interest4} onChange={(e) => setInterest4(e.target.value)}/>
              <datalist id="interests" >
              {interestsList.map((interest, index) => <option key={index}>{interest}</option>)}
              </datalist>
          </div>
          <button type="submit">Update Interests</button>
          <Link className="post-signup-skip" to="/home">Skip for now</Link>
          </form>
          <div className="post-signup-box">
          <div>Please choose interests from dropdown for the best results - one per box.</div>
        </div>
      </div>
    </>
     )
}

export default UpdateInterests
