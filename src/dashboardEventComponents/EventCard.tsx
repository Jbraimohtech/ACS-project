import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/event-detail-page/${event.id}`);
  };

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
        <h2>{event.title}</h2>

        <div className="stellarEventLocation">
          <MapPin size={14} />
          <span>{event.venue}</span>
        </div>

        <p>{event.description}</p>

        <div className="stellarEventActions">
          <button className="stellarRSVPButton">
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
  );
};

export default EventCard;