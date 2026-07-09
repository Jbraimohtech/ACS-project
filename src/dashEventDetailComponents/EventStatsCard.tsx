import { useState } from "react";
import { CalendarPlus, CheckCircle, ChevronDown, X } from "lucide-react";
import "./EventStatsCard.css"

const EventStatsCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleGoing = () => {
    setShowModal(false);

    setTimeout(() => {
      setShowRegisterModal(true);
    }, 200);
  };

  return (
    <>
      <div className="novaStatsCard">
        <p className="novaStatsLabel">
          ATTENDANCE STATUS
        </p>

        <h2>450+</h2>

        <span>
          Attending from top firms
        </span>

        <button className="novaRsvpButton" onClick={() => setShowModal(true)}>
          <CheckCircle size={16} />
          RSVP Now
        </button>

        <button className="novaCalendarButton">
          <CalendarPlus size={16} />
          Add to Calendar
        </button>
      </div>

      {showModal && (
        <div className="event-modal-overlay">
          <div className="attendance-modal">
            <button className="close-btn" onClick={() => setShowModal(false)}>
              <X size={28} />
            </button>

            <h2>Confirm Your Attendance</h2>

            <p>Will you be attending this event?</p>

            <div className="modal-actions">
              <button className="going-btn" onClick={handleGoing}>
                Going
              </button>

              <button className="not-going-btn" onClick={() => setShowModal(false)}>
                Not Going
              </button>
            </div>
          </div>
        </div>
      )}

      {showRegisterModal && (
        <div className="register-modal-overlay">
          <div className="register-modal">
            <button className="close-btn" onClick={() => setShowRegisterModal(false)}>
              <X size={28} />
            </button>

            <h2>Input your details to register</h2>

            <p>Will you be attending this event?</p>

            <form className="register-form">
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Surname" />

              <div className="select-wrapper">
                <select>
                  <option>Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <ChevronDown size={24} className="select-icon" />
              </div>

              <input type="email" placeholder="Email Address" />
              <input type="text" placeholder="Home Address" required />

              <div className="register-phone-input">
                <div className="country-code">
                  <img src="/src/assets/images/nigeria-flag.svg" alt="Nigeria flag" className="country-flag-icon" />
                  <span>+234</span>
                  <ChevronDown size={20} />
                </div>

                <input type="text" placeholder="Phone Number" />
              </div>

              <button type="submit" className="register-continue-btn">
                Continue
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default EventStatsCard