import React, { useEffect } from 'react'

function DeleteConfirmPopup({value}) {

    useEffect(() => {
        if (value.aboutToDelete) {
            document.getElementById("popup0").classList.remove("form-not-loaded");
            document.getElementById("popup1").classList.remove("form-not-loaded");
        } else {
            document.getElementById("popup0").classList.add("form-not-loaded");
            document.getElementById("popup1").classList.add("form-not-loaded");
        }
    }, [value.aboutToDelete])

  return (
    <div id="popup0" className="popup-shade-bg form-not-loaded">
        <div id="popup1" className="popup-ctn form-not-loaded">
            <h3>Are you sure you want to delete this tournament?</h3>
            <p>This action cannot be undone.</p>
            <div className="popup-btn-ctn">
                <button type="button" className="tournament-card-delete" onClick={() => value.deleteConfirmed()}>Delete</button>
                <button type="button" className="tournament-card-edit" onClick={() => value.setAboutToDelete(false)}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteConfirmPopup
