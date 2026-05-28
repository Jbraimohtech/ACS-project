import { X } from "lucide-react";
import "./Event.css"
import EventCard from '../components/EventCard'
import { useNavigate } from "react-router-dom"
import { useState } from "react";

const Featured = () => {
    const [showModal, setShowModal] =
    useState(false);
    const navigate = useNavigate();

    const goToViewFeaturedDetails = () => {
        navigate("/view-featured-details")
    }


  return (
    <div className='featured'>

        <div className='featured-clicked-box'>
            <div className='featured-clicked-text'>
                <p>Upcoming Events</p>
            </div>
            <div className='featured-clicked-other-text'>
                <p>Past Events</p>
            </div>
        </div>

        <p className='event-featured'>Featured Events</p>
        <div className='under-event-featured'>
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
        </div>

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
                    <button className="going-btn">
                        Going
                    </button>

                    <button className="not-going-btn">
                        Not Going
                    </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default Featured;