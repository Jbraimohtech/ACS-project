import {
  MapPin,
  Users,
} from "lucide-react";


const EventCard = () => {
  return (
    <div className="stellarEventRow">

      <div className="stellarDateBlock">
        <span>Thur</span>

        <h2>04</h2>

        <p>SEP</p>

        <p>2026</p>
      </div>

      <div className="stellarEventImage"></div>

      <div className="stellarEventInfo">

        <h2>
          Annual Tech
          <br />
          Symposium 2024
        </h2>

        <div className="stellarEventLocation">
          <MapPin size={14} />

          <span>
            Las vegas convention center,
            las vegas, USA
          </span>
        </div>

        <p>
          Join industry leaders for a two-day
          deep dive into the future of AI,
          decentralized networks, and the
          evolution of digital ecosystems.
        </p>

        <div className="stellarAttendance">
          <Users size={13} />
          450+ attending
        </div>

        <div className="stellarEventActions">
          <button className="stellarRSVPButton">
            RSVP
          </button>

          <button className="stellarDetailsButton">
            View details
          </button>
        </div>

      </div>

    </div>
  )
}

export default EventCard