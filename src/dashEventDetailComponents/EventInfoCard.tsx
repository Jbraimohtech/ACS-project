import "./EventInfoCard.css";

interface Event {
  dress_code: string;
  wifi: string;
}

interface EventInfoCardProps {
  event: Event;
}

const EventInfoCard = ({
  event,
}: EventInfoCardProps) => {
  return (
    <div className="galaxyInfoCard">
      <h3 className="galaxyInfoTitle">
        Essential Info
      </h3>

      <div className="galaxyInfoRow">
        <span>Dress Code</span>
        <strong>{event.dress_code}</strong>
      </div>

      <div className="galaxyInfoRow">
        <span>Wifi</span>
        <strong>{event.wifi}</strong>
      </div>
    </div>
  );
};

export default EventInfoCard;