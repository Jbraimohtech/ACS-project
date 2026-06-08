import "./EventVenueCard.css"
import { MapPin } from "lucide-react";

const EventVenueCard = () => {
  return (
    <div className="novaVenueCard">
      <img
        src="/map-placeholder.jpg"
        alt=""
        className="novaVenueMap"
      />

      <div className="novaVenueContent">
        <h3>Venue</h3>

        <h4>
          Las Vegas Convention Center
        </h4>

        <p>
          3150 Paradise Rd,
          Las Vegas, NV 89109,
          United States
        </p>

        <button className="novaDirectionsButton">
          <MapPin size={15} />
          Get Directions
        </button>
      </div>
    </div>
  )
}

export default EventVenueCard