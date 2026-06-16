import "./EventVenueCard.css";
import { MapPin } from "lucide-react";

interface EventVenueCardProps {
  event: {
    venue: string;
  };
}

const EventVenueCard = ({
  event,
}: EventVenueCardProps) => {
  return (
    <div className="novaVenueCard">
      <img
        src="/map-placeholder.jpg"
        alt="Venue Map"
        className="novaVenueMap"
      />

      <div className="novaVenueContent">
        <h3>Venue</h3>

        <h4>{event.venue}</h4>

        <p>{event.venue}</p>

        <button className="novaDirectionsButton">
          <MapPin size={15} />
          Get Directions
        </button>
      </div>
    </div>
  );
};

export default EventVenueCard;