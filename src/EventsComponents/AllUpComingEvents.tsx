import { X, ChevronDown, } from "lucide-react";
import "./Event.css";
import EventCard from '../components/EventCard';
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const AllUpComingEvents = () => {
    const navigate = useNavigate();

    const [showModal, setShowModal] =
    useState(false);

    const [showRegisterModal, setShowRegisterModal] =
    useState(false);

    // OPEN REGISTER MODAL
    const handleGoing = () => {
        setShowModal(false);

        setTimeout(() => {
        setShowRegisterModal(true);
        }, 200);
    };

    const goToViewFeaturedDetails = () => {
        navigate("/view-featured-details")
    }

  return (
    <div className='all-up-coming-events'>
        <p className='event-featured'>All Upcoming Events</p>
        <EventCard>
            <div className='first-text-box'>
                <div className='first-text'>
                    <p>Thur</p>
                    <h1>04</h1>
                    <p>SEP <br /> 2026</p>
                </div>
                <div className='featured-first-img'></div>
            </div>
            <div className='feature-details'>
                <h2>Annual Tech Symposium 2024</h2>
                <div className='location-icon-box'>
                    <div className='location-icon'></div>
                    <p>Las vegas convention center, las vagas, USA</p>
                </div>
                <p className='middle-location-icon-text'>Join industry leaders for a two-day deep dive into the future of AI, <br /> decentralized networks, and the evolution of digital ecosystems.</p>
                <div className='location-icon-box'>
                    <div className='attending-icon'></div>
                    <p>450+ attending</p>
                </div>
                {/* the direct buttons to other parts of event pages */}
                <div className='rsvp-box'>
                    <button className="rsvp" onClick={() => setShowModal(true)}>
                        <p className='rsvp-box-first-p'>RSVP</p>
                    </button>
                    <button className="view-details" onClick={goToViewFeaturedDetails}>
                        <p className='rsvp-box-second-p'>View details</p>
                    </button>
                </div>
            </div>
        </EventCard>
        <div className='horizontal-line'></div>
        <EventCard>
            <div className='first-text-box'>
                <div className='first-text'>
                    <p>Thur</p>
                    <h1>04</h1>
                    <p>SEP <br /> 2026</p>
                </div>
                <div className='featured-first-img'></div>
            </div>
            <div className='feature-details'>
                <h2>Annual Tech Symposium 2024</h2>
                <div className='location-icon-box'>
                    <div className='location-icon'></div>
                    <p>Las vegas convention center, las vagas, USA</p>
                </div>
                <p className='middle-location-icon-text'>Join industry leaders for a two-day deep dive into the future of AI, <br /> decentralized networks, and the evolution of digital ecosystems.</p>
                <div className='location-icon-box'>
                    <div className='attending-icon'></div>
                    <p>450+ attending</p>
                </div>
                {/* the direct buttons to other parts of event pages */}
                <div className='rsvp-box'>
                    <button className="rsvp" onClick={() => setShowModal(true)}>
                        <p className='rsvp-box-first-p'>RSVP</p>
                    </button>
                    <button className="view-details" onClick={goToViewFeaturedDetails}>
                        <p className='rsvp-box-second-p'>View details</p>
                    </button>
                </div>
            </div>
        </EventCard>
        <div className='horizontal-line'></div>
        <EventCard>
            <div className='first-text-box'>
                <div className='first-text'>
                    <p>Thur</p>
                    <h1>04</h1>
                    <p>SEP <br /> 2026</p>
                </div>
                <div className='featured-first-img'></div>
            </div>
            <div className='feature-details'>
                <h2>Annual Tech Symposium 2024</h2>
                <div className='location-icon-box'>
                    <div className='location-icon'></div>
                    <p>Las vegas convention center, las vagas, USA</p>
                </div>
                <p className='middle-location-icon-text'>Join industry leaders for a two-day deep dive into the future of AI, <br /> decentralized networks, and the evolution of digital ecosystems.</p>
                <div className='location-icon-box'>
                    <div className='attending-icon'></div>
                    <p>450+ attending</p>
                </div>
                {/* the direct buttons to other parts of event pages */}
                <div className='rsvp-box'>
                    <button className="rsvp" onClick={() => setShowModal(true)}>
                        <p className='rsvp-box-first-p'>RSVP</p>
                    </button>
                    <button className="view-details" onClick={goToViewFeaturedDetails}>
                        <p className='rsvp-box-second-p'>View details</p>
                    </button>
                </div>
            </div>
        </EventCard>

        {/* MODAL */}
        {showModal && (
            <div className="event-modal-overlay">
                <div className="attendance-modal">
                    {/* CLOSE */}
                    <button
                    className="close-btn"
                    onClick={() =>
                        setShowModal(false)
                    }
                    >
                    <X size={28} />
                    </button>

                    {/* CONTENT */}
                    <h2>
                    Confirm Your Attendance
                    </h2>

                    <p>
                    Will you be attending
                    this event?
                    </p>

                    {/* ACTIONS */}
                    <div className="modal-actions">
                    <button className="going-btn" onClick={handleGoing}>
                        Going
                    </button>

                    <button className="not-going-btn" onClick={() =>
                        setShowModal(false)
                    }>
                        Not Going
                    </button>
                    </div>
                </div>
            </div>
        )}

        {/* REGISTER MODAL */}
      {showRegisterModal && (
        <div className="register-modal-overlay">
          <div className="register-modal">
            {/* CLOSE */}
            <button
              className="close-btn"
              onClick={() =>
                setShowRegisterModal(
                  false
                )
              }
            >
              <X size={28} />
            </button>

            {/* TITLE */}
            <h2>
              Input your details to
              register
            </h2>

            <p>
              Will you be attending
              this event?
            </p>

            {/* FORM */}
            <form className="register-form">
              <input
                type="text"
                placeholder="First Name"
              />

              <input
                type="text"
                placeholder="Surname"
              />

              {/* GENDER */}
              <div className="select-wrapper">
                <select>
                  <option>
                    Gender
                  </option>

                  <option>
                    Male
                  </option>

                  <option>
                    Female
                  </option>
                </select>

                <ChevronDown
                  size={24}
                  className="select-icon"
                />
              </div>

              <input
                type="email"
                placeholder="Email Address"
              />

              <input
                type="text"
                placeholder="Home Address"
              />

              {/* PHONE */}
              <div className="register-phone-input">
                <div className="country-code">
                  <span className="dot"></span>

                  <span>+234</span>

                  <ChevronDown
                    size={20}
                  />
                </div>

                <input
                  type="text"
                  placeholder="Phone Number"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="register-continue-btn"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllUpComingEvents