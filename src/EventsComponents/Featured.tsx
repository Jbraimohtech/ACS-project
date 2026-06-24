import { X, ChevronDown, } from "lucide-react";
import "./Event.css"
import EventCard from '../components/EventCard'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

interface Event {
  id: number;
  image: string | null;
  user_id: number;
  zone_id: number | null;
  title: string;
  dress_code: string | null;
  wifi: string | null;
  date: string;
  description: string;
  venue: string;
  is_featured: number;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
}

const Featured = () => {
    const [showModal, setShowModal] =
    useState(false);

    const [showRegisterModal, setShowRegisterModal] =
    useState(false);

    const handleGoing = () => {
        setShowModal(false);

        setTimeout(() => {
        setShowRegisterModal(true);
        }, 200);
    };
    const navigate = useNavigate();

    const goToViewFeaturedDetails = () => {
        navigate(
          `/view-featured-details/${featuredEvent?.id}`
        )
    }

    const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);

    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await fetch(
            "https://ambchapcorps.org/api/event?page=1&per_page=10"
          );

          if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
          }

          const result = await response.json();
          console.log("Featured event response:", result);

          // Handle both wrapped { status, data: [...] } and direct array responses
          const eventsArray = result.data || result;
          const featured = Array.isArray(eventsArray) ? eventsArray.find((event: Event) => event.is_featured === 1) : null;

          setFeaturedEvent(featured || null);
        } catch (error) {
          console.error("Error fetching featured event:", error);
        }
      };

      fetchEvents();
    }, []);


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
                  <div className='first-text-box-left'>
                    <p>
                      {featuredEvent &&
                        new Date(
                          featuredEvent.date
                        ).toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                    </p>

                    <h1>
                      {featuredEvent &&
                        new Date(
                          featuredEvent.date
                        ).getDate()}
                    </h1>

                    <p>
                      {featuredEvent &&
                        new Date(
                          featuredEvent.date
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                    </p>
                  </div>
                  <div className='featured-first-img'></div>
                </div>
                <div className='feature-details'>
                  <h2>{featuredEvent?.title}</h2>
                  <div className='location-icon-box'>
                      <div className='location-icon'></div>
                      <p>{featuredEvent?.venue}</p>
                  </div>
                  <p className='middle-location-icon-text'>
                    {featuredEvent?.description}
                  </p>
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
                    <button className="going-btn" onClick={handleGoing}>
                        Going
                    </button>

                    <button className="not-going-btn" onClick={() =>
                        setShowModal(false)}>
                        Not Going
                    </button>
                    </div>
                </div>
            </div>
        )}

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

export default Featured;