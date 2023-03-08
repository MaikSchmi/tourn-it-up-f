import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth.context';
import interests from "../hobbies.json";

function PostSignup() {
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

    interest0 !== "" && updateInterestsInDb.push(interest0)
    interest1 !== "" && updateInterestsInDb.push(interest1)
    interest2 !== "" && updateInterestsInDb.push(interest2)
    interest3 !== "" && updateInterestsInDb.push(interest3)
    interest4 !== "" && updateInterestsInDb.push(interest4)

    try {
      await axios.post(`${import.meta.env.BASE_URL_API}/auth/update-interests/${user.username}`, {slogan: slogan, updateInterestsInDb})
      user.interest = updateInterestsInDb;
      navigate("/home");
    } catch (error) {
      console.log("Error updating interests: ", error);
    }
  }

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
    <div className="post-signup-ctn landing-font form-page-top-level">
      <div>
        <div className="form-ctn">
          <div className="post-signup-box">
            <h1 style={{marginBottom: "10px"}}>Welcome, {user && user.username}!</h1>
            <div>Thank you for joining our great TournItUp Community! You are now officially a TournItUpa!</div>
            <div>To give you the best experience, please tell us a few things that you like!</div>
          </div>
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
      </div>
    </div>
  )
}

export default PostSignup
