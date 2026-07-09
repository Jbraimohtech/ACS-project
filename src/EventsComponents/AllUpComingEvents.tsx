import { X, ChevronDown, } from "lucide-react";
import "./Event.css";
import EventCard from '../components/EventCard';
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import fallbackEventImage from '../assets/images/ofiice-five-img.jpg';
import { getEventImage } from '../utils/eventUtils';
import LoadingBrand from '../components/LoadingBrand';

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

const AllUpComingEvents = () => {
    const navigate = useNavigate();
    const PAGE_SIZE = 10;

    const [showModal, setShowModal] =
    useState(false);

    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [visibleEvents, setVisibleEvents] = useState<Event[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [showRegisterModal, setShowRegisterModal] =
    useState(false);

    // OPEN REGISTER MODAL
    const handleGoing = () => {
        setShowModal(false);

        setTimeout(() => {
        setShowRegisterModal(true);
        }, 200);
    };

    const fetchEvents = useCallback(async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `https://ambchapcorps.org/api/event?page=1&per_page=${PAGE_SIZE}`
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const result = await response.json();
        const eventsArray = Array.isArray(result?.data)
          ? result.data
          : Array.isArray(result)
            ? result
            : [];
        const fetchedEvents = eventsArray as Event[];

        setAllEvents(fetchedEvents);
        setVisibleEvents(fetchedEvents.slice(0, PAGE_SIZE));
        setHasMore(fetchedEvents.length > PAGE_SIZE);
        setPage(1);
      } catch (error) {
        console.error("Error fetching events:", error);
        setAllEvents([]);
        setVisibleEvents([]);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    }, [PAGE_SIZE]);

    useEffect(() => {
      const timeoutId = window.setTimeout(() => {
        void fetchEvents();
      }, 0);

      return () => window.clearTimeout(timeoutId);
    }, [fetchEvents]);

  const loadMoreEvents = () => {
    if (isLoading || !hasMore) return;

    const nextPage = page + 1;
    const nextVisibleEvents = allEvents.slice(0, nextPage * PAGE_SIZE);

    setVisibleEvents(nextVisibleEvents);
    setPage(nextPage);
    setHasMore(nextVisibleEvents.length < allEvents.length);
  };

  return (
    <div className='all-up-coming-events'>
        <p className='event-featured'>All Upcoming Events</p>
        {visibleEvents.map((event) => (
          <div key={event.id}>
            <EventCard>
              <div className="first-text-box">
                <div className="first-text">

                  <p>
                    {new Date(
                      event.date
                    ).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                      }
                    )}
                  </p>

                  <h1>
                    {new Date(
                      event.date
                    ).getDate()}
                  </h1>

                  <p>
                    {new Date(
                      event.date
                    ).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </p>

                </div>

                <img
                  src={event.image ? getEventImage(event.image) : fallbackEventImage}
                  alt={event.title}
                  className="featured-first-img"
                />
              </div>

              <div className="feature-details">

                <h2>{event.title}</h2>

                <div className="location-icon-box">
                  <div className="location-icon"></div>

                  <p>{event.venue}</p>
                </div>

                <p className="middle-location-icon-text">
                  {event.description}
                </p>

                <div className="location-icon-box">
                  <div className="attending-icon"></div>

                  <p>Attendance Open</p>
                </div>

                <div className="rsvp-box">

                  <button
                    className="rsvp"
                    onClick={() =>
                      setShowModal(true)
                    }
                  >
                     <p className="rsvp-box-first-p">RSVP</p>
                  </button>

                  <button
                    className="view-details"
                    onClick={() =>
                      navigate(
                        `/view-featured-details/${event.id}`
                      )
                    }
                  >
                     <p className="rsvp-box-second-p">View Details</p>
                  </button>

                </div>

              </div>
            </EventCard>

            <div className="horizontal-line"></div>
          </div>
        ))}

        {hasMore && (
          <div className="load-more-wrapper">
            <button
              className="load-more-btn"
              onClick={loadMoreEvents}
              disabled={isLoading}
            >
             {isLoading ? <LoadingBrand /> : "Load more events"} 
            </button>
          </div>
        )}

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
                required
              />

              {/* PHONE */}
              <div className="register-phone-input">
                <div className="country-code">
                  <img src="/src/assets/images/nigeria-flag.svg" alt="Nigeria flag" className="country-flag-icon" />

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