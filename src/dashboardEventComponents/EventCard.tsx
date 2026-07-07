import { useState } from "react";
import { ChevronDown, MapPin, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getToken, getUser } from "../utils/auth";

interface Event {
  id: number;
  title: string;
  description: string;
  venue: string;
  date: string;
  image: string;
  is_featured: number;
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const currentUser = getUser();

  const [attendanceForm, setAttendanceForm] = useState({
    first_name: currentUser?.first_name || "",
    last_name: currentUser?.last_name || "",
    gender: currentUser?.gender || "",
    email: currentUser?.email || "",
    home_address: "",
    phone_number: currentUser?.phone ?? currentUser?.phone_number ?? "",
  });

  const [submittingAttendance, setSubmittingAttendance] = useState(false);
  
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleViewDetails = () => {
    navigate(`/event-detail-page/${event.id}`);
  };

  const handleGoing = () => {
    setShowModal(false);

    setTimeout(() => {
      setShowRegisterModal(true);
    }, 200);
  };

  const handleAttendanceSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  const trimmedHomeAddress = attendanceForm.home_address.trim();

  if (!trimmedHomeAddress) {
    alert("Home address is required before submitting your attendance.");
    return;
  }

  try {
    setSubmittingAttendance(true);

    const token = getToken();

    const response = await fetch(
      "https://ambchapcorps.org/api/event/attendance",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          event_id: event.id,
          ...attendanceForm,
          home_address: trimmedHomeAddress,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message ||
        Object.values(result.errors || {})
          .flat()
          .join(", ") ||
        "Attendance registration failed"
      );
    }

    alert(result.message);

    setShowRegisterModal(false);

    setAttendanceForm({
      first_name: currentUser?.first_name || "",
      last_name: currentUser?.last_name || "",
      gender: currentUser?.gender || "",
      email: currentUser?.email || "",
      home_address: "",
      phone_number: currentUser?.phone ?? currentUser?.phone_number ?? "",
    });

  } catch (err) {
    if (err instanceof Error) {
      alert(err.message);
    } else {
      alert("Something went wrong");
    }
  } finally {
    setSubmittingAttendance(false);
  }
};

  return (
    <>
      <div className="stellarEventRow">
        <div className="stellarDateBlock">
          {(() => {
            const date = new Date(event.date);
            const day = date.toLocaleDateString("en-US", { weekday: "short" });
            const dateNum = date.getDate();
            const month = date.toLocaleDateString("en-US", { month: "short" });
            const year = date.getFullYear();

            return (
              <>
                <span>
                  {day}
                </span>

                <h2>
                  {dateNum}
                </h2>

                <p>
                  {month}
                </p>

                <p>
                  {year}
                </p>
              </>
            );
          })()}
        </div>

        <div className="stellarEventImage"></div>

        <div className="stellarEventInfo">
          <h2>{event.title}</h2>

          <div className="stellarEventLocation">
            <MapPin size={14} />
            <span>{event.venue}</span>
          </div>

          <p>{event.description}</p>

          <div className="stellarEventActions">
            <button className="stellarRSVPButton" onClick={() => setShowModal(true)}>
              RSVP
            </button>

            <button
              className="stellarDetailsButton"
              onClick={handleViewDetails}
            >
              View details
            </button>
          </div>
        </div>
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

            <form className="register-form" onSubmit={handleAttendanceSubmit}>
              <input
                type="text"
                placeholder="First Name"
                value={attendanceForm.first_name}
                onChange={(e) =>
                  setAttendanceForm({
                    ...attendanceForm,
                    first_name: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Surname"
                value={attendanceForm.last_name}
                onChange={(e) =>
                  setAttendanceForm({
                    ...attendanceForm,
                    last_name: e.target.value,
                  })
                }
              />

              <div className="select-wrapper">
                <select
                  value={attendanceForm.gender}
                  onChange={(e) =>
                    setAttendanceForm({
                      ...attendanceForm,
                      gender: e.target.value,
                    })
                  }
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <ChevronDown size={24} className="select-icon" />
              </div>

              <input
                type="email"
                placeholder="Email Address"
                value={attendanceForm.email}
                onChange={(e) =>
                  setAttendanceForm({
                    ...attendanceForm,
                    email: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Home Address"
                required
                value={attendanceForm.home_address}
                onChange={(e) =>
                  setAttendanceForm({
                    ...attendanceForm,
                    home_address: e.target.value,
                  })
                }
              />

              <div className="register-phone-input">
                <div className="country-code">
                  <img src="/src/assets/images/nigeria-flag.svg" alt="Nigeria flag" className="country-flag-icon" />
                  <span>+234</span>
                  <ChevronDown size={20} />
                </div>

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={attendanceForm.phone_number}
                  onChange={(e) =>
                    setAttendanceForm({
                      ...attendanceForm,
                      phone_number: e.target.value,
                    })
                  }
                />
              </div>

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
    </>
  );
};

export default EventCard;