import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ChangeMembershipPopup from '../components/ChangeMembershipPopup';
import { AuthContext } from '../contexts/Auth.context'

function MembershipOptions() {
  const {user, logoutUser } = useContext(AuthContext);
  const [aboutToUpdate, setAboutToUpdate] = useState(false);
  const [planChosen, setPlanChosen] = useState("")
  const navigate = useNavigate();

  const setMembership = async () => {
    try {
      const updatedUser = await axios.post(`${import.meta.env.VITE_BASE_URL_API}/auth/update-membership-plan`, {user: user.username, plan: planChosen})
      user.status = updatedUser.data.newStatus;
      navigate("/")
    } catch (error) {
      console.log("Error with your purchase: ", error);
    }
  }

  useEffect(() => {
    if (planChosen !== "") setAboutToUpdate(true);
  }, [planChosen])

  return (
    <>
    {user ? <ChangeMembershipPopup value={{setMembership, aboutToUpdate, setAboutToUpdate, setPlanChosen}}/> : navigate("/signup")}
    <div className="membership-options-main-ctn">
      <div>
        <h1 style={{textAlign: "center", padding: "25px"}}>Choose Your Membership Plan</h1>    
        <div className="membership-option-card-ctn">
          <section className="membership-option-card free-plan">
            <h3 className="free-plan-inner">Member</h3>
            <p>As a Member you are free to join and participate in one tournament a month!</p>
            <h5>Benefits</h5>
            <ul className="free-plan-inner">
              <li>1 Tournament / month</li>
              <li>Access to our forums</li>
            </ul>
            <button type="button" style={{boxShadow: "3px 3px"}} onClick={() => setPlanChosen("free")}>Free</button>
          </section>
          <section className="membership-option-card paid-plan">
            <h3 className="paid-plan-inner">Paid Member</h3>
            <p>For a small fee, you can create one tournament a month and participate in as many tournaments as you like!</p>
            <h5>Benefits</h5>
            <ul className="paid-plan-inner">
              <li>Create 1 Tournament / month</li>
              <li>Participate in 5 Tournaments / month</li>
              <li>Access to our forums</li>
            </ul>
            <button type="button" style={{boxShadow: "3px 3px"}} onClick={() => setPlanChosen("paid")}>2,99€<br/>/ Month</button>
          </section>
          <section className="membership-option-card premium-plan">
            <h3 className="premium-plan-inner">👑 Premium Member 👑</h3>
            <p>Join us today as a premium member and gain access to all the feature GreatTournaments has to offer!</p>
            <h5>Benefits</h5>
            <ul className="premium-plan-inner">
              <li>Create unlimited Tournaments</li>
              <li>Participate in unlimited Tournaments</li>
              <li>Customize your tournament pages and make them your own</li>
              <li>Access to our forums</li>
              <li>Special status in our forums</li>
            </ul>
            <button type="button" style={{boxShadow: "3px 3px"}} onClick={() => setPlanChosen("premium")}>9,99€<br/>/ Month</button>
          </section>
        </div>
      </div>
    </div>
    </>
  )
}

export default MembershipOptions
