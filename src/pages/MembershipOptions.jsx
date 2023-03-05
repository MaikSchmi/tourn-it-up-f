import axios from 'axios';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth.context'

function MembershipOptions() {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  const setMembership = async (plan) => {
    if (!user) navigate("/signup")
    try {
      await axios.post("http://localhost:5005/user/update-membership-plan", {user: user.username, plan: plan})
      navigate("/home")
    } catch (error) {
      console.log("Error with your purchase: ", error);
    }
  }

  return (
    <div className="membership-options-main-ctn">
      <h1 style={{textAlign: "center", padding: "25px"}}>Choose Your Membership Plan</h1>    
      <div className="membership-option-card-ctn">
        <section className="membership-option-card">
          <h3>Member</h3>
          <p>As a Member you are free to join and participate in one tournament a month!</p>
          <h5>Benefits</h5>
          <ul>
            <li>-- 1 Tournament / month</li>
            <li>-- Access to our forums</li>
          </ul>
          <button type="button" onClick={() => setMembership("free")}>Free</button>
        </section>
        <section className="membership-option-card">
          <h3>Paid Member</h3>
          <p>For a small fee, you can create one tournament a month and participate in as many tournaments as you like!</p>
          <h5>Benefits</h5>
          <ul>
            <li>-- Create 1 Tournament / month</li>
            <li>-- Participate in unlimited Tournaments</li>
            <li>-- Access to our forums</li>
          </ul>
          <button type="button" onClick={() => setMembership("paid")}>2,99€<br/>/ Month</button>
        </section>
        <section className="membership-option-card">
          <h3>Premium Member</h3>
          <p>Join us today as a premium member and gain access to all the feature TournItUp has to offer!</p>
          <h5>Benefits</h5>
          <ul>
            <li>-- Create unlimited Tournaments</li>
            <li>-- Participate in unlimited Tournaments</li>
            <li>-- Access to our forums</li>
            <li>-- Special status in our forums</li>
          </ul>
          <button type="button" onClick={() => setMembership("premium")}>9,99€<br/>/ Month</button>
        </section>
      </div>
    </div>
  )
}

export default MembershipOptions
