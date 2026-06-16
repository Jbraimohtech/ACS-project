import { CalendarPlus, CheckCircle } from "lucide-react";
import "./EventStatsCard.css"


const EventStatsCard = () => {
  return (
    <div className="novaStatsCard">
      <p className="novaStatsLabel">
        ATTENDANCE STATUS
      </p>

      <h2>450+</h2>

      <span>
        Attending from top firms
      </span>

      <button className="novaRsvpButton">
        <CheckCircle size={16} />
        RSVP Now
      </button>

      <button className="novaCalendarButton">
        <CalendarPlus size={16} />
        Add to Calendar
      </button>
    </div>
  )
}

export default EventStatsCard