import {
  CalendarDays,
  MapPin,
  Download,
  CircleCheck,
  X, 
  ChevronDown,
} from "lucide-react";
import "./Event.css"
import AllMainContent from "../components/AllMainContent";
import HomeFooter from "../components/HomeFooter";
import "../blogComponents/Blog.css"
import BlogCard from "../components/BlogCard";
import BeAccountedFor from "./BeAccountedFor";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { getEventImage } from '../utils/eventUtils';
import LoadingBrand from '../components/LoadingBrand';
import EventSpeakersCard from "../dashEventDetailComponents/EventSpeakersCard";
import { getToken, getUser } from "../utils/auth";



interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string | null;
  gender: string | null;
  phone: string | null;
}

interface Event {
  id: number;
  image: string | null;
  user_id: number;
  zone_id: number;
  title: string;
  dress_code: string | null;
  wifi: string | null;
  date: string;
  description: string;
  venue: string;
  created_at: string;
  updated_at: string;
  user: User;
}



const ViewFeaturedDetails: React.FC = () => {
  const currentUser = getUser();
  const [event, setEvent] = useState<Event | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submittingAttendance, setSubmittingAttendance] = useState(false);
  const [attendanceForm, setAttendanceForm] = useState({
    first_name: currentUser?.first_name || "",
    last_name: currentUser?.last_name || "",
    gender: currentUser?.gender || "",
    email: currentUser?.email || "",
    home_address: "",
    phone_number: currentUser?.phone ?? currentUser?.phone_number ?? "",
  });
  const { id } = useParams();
  
  const handleGoing = () => {
        setShowModal(false);

        setTimeout(() => {
        setShowRegisterModal(true);
        }, 200);
    };

    const handleAttendanceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const trimmedHomeAddress = attendanceForm.home_address.trim();

      if (!trimmedHomeAddress) {
        alert("Home address is required before submitting your attendance.");
        return;
      }

      if (!event?.id) {
        alert("Event details are not available right now.");
        return;
      }

      const token = getToken();

      if (!token) {
        alert("Please log in before registering for this event.");
        return;
      }

      try {
        setSubmittingAttendance(true);

        const response = await fetch("https://ambchapcorps.org/api/event/attendance", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            event_id: event.id,
            ...attendanceForm,
            home_address: trimmedHomeAddress,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.message ||
              Object.values(result?.errors || {})
                .flat()
                .join(", ") ||
              "Attendance registration failed"
          );
        }

        alert(result?.message || "Attendance submitted successfully.");
        setShowRegisterModal(false);
        setAttendanceForm({
          first_name: currentUser?.first_name || "",
          last_name: currentUser?.last_name || "",
          gender: currentUser?.gender || "",
          email: currentUser?.email || "",
          home_address: "",
          phone_number: currentUser?.phone ?? currentUser?.phone_number ?? "",
        });
      } catch (error) {
        alert(error instanceof Error ? error.message : "Something went wrong");
      } finally {
        setSubmittingAttendance(false);
      }
    };

    useEffect(() => {
      if (!id) return;

      const fetchEvent = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(
            `https://ambchapcorps.org/api/event/${id}`
          );

          if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
          }

          const result = await response.json();
          console.log("Fetched event:", result);

          // Handle both wrapped { status, data: {...} } and direct event responses
          const eventData = result.data || result;
          setEvent(eventData);
        } catch (error) {
          console.error("Error fetching event:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchEvent();
    }, [id]);

  return (
    <div>
        <AllMainContent> 
        <Navbar />
        <div  className='view-featured-head-text'>
          <h1>
            {event?.title}
          </h1>
        </div>

      </AllMainContent>
      {isLoading ? (
        <div className="featured-content-grid">
          <LoadingBrand />
        </div>
      ) : (
      <section className="featured-content-grid">
        {/* EVENT CARD */}
        <div className='event-featured-category-clicks'>
          <BlogCard>
            <div className="featured-event-blog-card">
              <div className='blog-card-prop'>
                {event?.image ? (
                  <img
                    src={getEventImage(event.image)}
                    alt={event?.title}
                    className='blog-first-img-featured'
                  />
                ) : null}
                <span className="featured-badge-and-title">
                  {/* <span className="featured-badge">
                    FLAGSHIP EVENT
                  </span> */}

                  <h2>{event?.title}</h2>

                  <div className="event-meta">
                    <span>
                      <CalendarDays size={14} />
                      {event
                        ? new Date(event.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : ""}
                    </span>

                    <span>
                      <MapPin size={14} />
                      {event?.venue}
                    </span>
                  </div>
                </span>
              </div>
              <div className='blog-feature-details'>
                <div className="attendance-card">
                  <div className="under-attendance-card">
                    <div className="small-line"></div>

                    <span className="mini-label">
                      ATTENDANCE STATUS
                    </span>
                  </div>

                  <div className="row-big-text-featured">
                    <h2>450+</h2>
                    <p>
                      Attending from top firms
                    </p>
                  </div>

                  <div className="row-big-text-featured-phone">
                    <h2>{event?.title}</h2>
                    <p>
                      {event?.venue}
                    </p>
                  </div>

                  <button className="rsvp-btn" onClick={() => setShowModal(true)}>
                    <CircleCheck size={16} />
                    RSVP Now
                  </button>
                </div>
              </div>
            </div>
          </BlogCard>
        </div>

          <div className="row-featured-details">
        {/* LEFT COLUMN */}
        <div className="left-column-featured">
          
          {/* ABOUT */}
          <div className="about-featured-card-one">
            <h3>About the Event</h3>

            <p
              style={{
                whiteSpace: "pre-line",
              }}
            >
              {event?.description}
            </p>

            {/* Phone only */}
            <span className="about-featured-card-phone-text">
              {event?.description}
            </span>
            {/* End phone only */}

            {/* FEATURES */}
            <div className="feature-grid">
              <div className="feature-item">
                <div className="ai-workshop-icon"></div>
                <span>
                  12+ AI Workshops
                </span>
              </div>

              <div className="feature-item">
                <div className="global-networking-icon"></div>
                <span>
                  Global Networking
                </span>
              </div>

              <div className="feature-item">
                <div className="rocket-icon"></div>
                <span>
                  Startup Pitches
                </span>
              </div>
            </div>
          </div>

          {/* SCHEDULE */}
          <div className="about-featured-card">
            <div className="schedule-header">
                <div>
                    <div className="small-horizontal-line"></div>
                    <h3>Schedule</h3>
                </div>

              <button className="download-btn">
                Download PDF
                <Download size={14} />
              </button>
            </div>

            <div className="schedule-list">
              <div className="schedule-item">
                <div className="time">
                  09:00 AM
                  <p>60 MINS</p>
                </div>

                <div className="schedule-info">
                    <div className="schedule-boxes">
                        <span className="tag blue">
                            KEYNOTE
                        </span>

                        <h4>
                            Opening Keynote:
                            The Future of AI
                        </h4>
                    </div>

                  <p>
                    Main Auditorium · Dr.
                    Sarah Jenkins
                  </p>
                </div>
              </div>

              <div className="schedule-item">
                <div className="time">
                  10:30 AM
                  <p>90 MINS</p>
                </div>

                <div className="schedule-info">
                    <div className="schedule-boxes">
                        <span className="tag purple">
                            PANEL
                        </span>

                        <h4>
                            Decentralized Network
                            Architecture
                        </h4>
                    </div>

                  <p>
                    Room 402B · Lead
                    Architects Panel
                  </p>
                </div>
              </div>

              <div className="schedule-item">
                <div className="time">
                  12:30 PM
                  <p>120 MINS</p>
                </div>

                <div className="schedule-info">
                    <div className="schedule-boxes">
                        <span className="tag green">
                            NETWORKING
                        </span>

                        <h4>
                            Luncheon & Industry
                            Mixer
                        </h4>
                    </div>

                  <p>
                    Sky Lounge Terrace
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="right-column-featured">
          {/* SPEAKERS */}
          <EventSpeakersCard speakers={event?.user ? [event.user] : []} />
          {/* <div className="about-featured-card-two">
            <div className="small-line"></div>

            <h3>Featured Speakers</h3>

            <div className="speaker">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt=""
              />

              <div className="speaker-info">
                <h4>
                  {event?.user?.first_name ?? ""}
                  {" "}
                  {event?.user?.last_name ?? ""}
                </h4>

                <p>
                  Chief AI Officer, Zenith Labs
                </p>
              </div>
            </div>

            <div className="speaker">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt=""
              />

              <div className="speaker-info">
                <h4>Marcus Chen</h4>

                <p>
                  Founder, Decentral Labs
                </p>
              </div>
            </div>

            <div className="speaker">
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt=""
              />

              <div className="speaker-info">
                <h4>
                  Elena Rodriguez
                </h4>

                <p>
                  Lead Dev, Neural Protocols
                </p>
              </div>
            </div>

            <button className="view-btn">
              View All 24 Speakers
            </button>
          </div> */}

          {/* VENUE */}
            <div className="about-featured-card-map">
                <div className="map"></div>

                <div className="venue-info">
                    <div>
                        <div className="small-line"></div>
                        <span>Venue</span>
                    </div>
                    

                    <h4>{event?.venue}</h4>

                    <p>
                        3150 Paradise Rd,
                        <br />
                        Las Vegas, NV
                    </p>
                </div>
            </div>

          {/* INFO */}
          <div className="info-box">
            <div className="essential-icon-box">
                <div className="essential-icon"></div>
                <span>Essential Info</span>
            </div>
        
            <div className="under-info-box">
                <span>Dress Code</span>
                <h4>
                  {event?.dress_code ||
                    "Not specified"}
                </h4>
            </div>
            <div className="under-info-box">
              <span>VIP</span>
              <h4>
                {event?.wifi ||
                  "Not available"}
              </h4>
            </div>
          </div>
          </div>
        </div>
      </section>
      )}

      <BeAccountedFor />
      <HomeFooter />

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
            <form className="register-form" onSubmit={handleAttendanceSubmit}>
              <input
                type="text"
                placeholder="First Name"
                value={attendanceForm.first_name}
                onChange={(e) => setAttendanceForm({ ...attendanceForm, first_name: e.target.value })}
              />

              <input
                type="text"
                placeholder="Surname"
                value={attendanceForm.last_name}
                onChange={(e) => setAttendanceForm({ ...attendanceForm, last_name: e.target.value })}
              />

              {/* GENDER */}
              <div className="select-wrapper">
                <select
                  value={attendanceForm.gender}
                  onChange={(e) => setAttendanceForm({ ...attendanceForm, gender: e.target.value })}
                >
                  <option value="">Gender</option>

                  <option value="male">Male</option>

                  <option value="female">Female</option>
                </select>

                <ChevronDown
                  size={24}
                  className="select-icon"
                />
              </div>

              <input
                type="email"
                placeholder="Email Address"
                value={attendanceForm.email}
                onChange={(e) => setAttendanceForm({ ...attendanceForm, email: e.target.value })}
              />

              <input
                type="text"
                placeholder="Home Address"
                required
                value={attendanceForm.home_address}
                onChange={(e) => setAttendanceForm({ ...attendanceForm, home_address: e.target.value })}
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
                  value={attendanceForm.phone_number}
                  onChange={(e) => setAttendanceForm({ ...attendanceForm, phone_number: e.target.value })}
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="register-continue-btn"
                disabled={submittingAttendance}
              >
                {submittingAttendance ? "Submitting..." : "Continue"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewFeaturedDetails