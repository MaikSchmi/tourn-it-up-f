import React, { useEffect } from 'react'

function ChangeMembershipPopup({value}) {

    const handleCancelClick = () => {
        value.setAboutToUpdate(false);
        value.setPlanChosen("");
    }

    useEffect(() => {
        if (value.aboutToUpdate) {
            document.getElementById("popup0").classList.remove("form-not-loaded");
            document.getElementById("popup1").classList.remove("form-not-loaded");
        } else {
            document.getElementById("popup0").classList.add("form-not-loaded");
            document.getElementById("popup1").classList.add("form-not-loaded");
        }
    }, [value.aboutToUpdate])

  return (
    <div id="popup0" className="popup-membership-shade-bg form-not-loaded">
        <div id="popup1" className="popup-membership-ctn form-not-loaded">
            <h3>You are about to update your Membership.</h3>
            <p>Please confirm that you would like to update your membership to the chosen plan.<br/>Note: You will be signed out for the changes to take effect and they will reflect as soon as you sign in again.</p>
            <div className="popup-membership-btn-ctn">
                <button type="button" className="tournament-card-edit" onClick={() => value.changeConfirmed()}>Update</button>
                <button type="button" className="tournament-card-delete" onClick={handleCancelClick}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default ChangeMembershipPopup

