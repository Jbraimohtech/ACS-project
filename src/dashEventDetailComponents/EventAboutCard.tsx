import "./EventAboutCard.css";

interface Event {
  description: string;
}

interface EventAboutCardProps {
  event: Event;
}

const EventAboutCard = ({
  event,
}: EventAboutCardProps) => {
  return (
    <div className="nebulaAboutCard">
      <h2>About the Event</h2>

      <p>{event.description}</p>

      <div className="feature-grid">
        <div className="feature-item">
          <div className="ai-workshop-icon"></div>
          <span>12+ AI Workshops</span>
        </div>

        <div className="feature-item">
          <div className="global-networking-icon"></div>
          <span>Global Networking</span>
        </div>

        <div className="feature-item">
          <div className="rocket-icon"></div>
          <span>Startup Pitches</span>
        </div>
      </div>
    </div>
  );
};

export default EventAboutCard;