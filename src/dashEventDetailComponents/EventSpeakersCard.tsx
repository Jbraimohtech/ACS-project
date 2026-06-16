import "./EventSpeakersCard.css";

interface Speaker {
  id: number;
  name: string;
  title: string;
  image: string;
}

interface EventSpeakersCardProps {
  speakers: Speaker[];
}

const EventSpeakersCard = ({
  speakers,
}: EventSpeakersCardProps) => {
  return (
    <div className="orionSpeakersCard">
      <h3 className="orionSpeakersTitle">
        Featured Speakers
      </h3>

      {speakers.length > 0 ? (
        speakers.map((speaker) => (
          <div
            className="orionSpeakerItem"
            key={speaker.id}
          >
            <img
              src={`https://ambchapcorps.org/uploads/${speaker.image}`}
              alt={speaker.name}
              className="orionSpeakerAvatar"
            />

            <div>
              <h4>{speaker.name}</h4>
              <p>{speaker.title}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No speakers available</p>
      )}

      <button className="orionViewAllSpeakers">
        View All {speakers.length} Speakers
      </button>
    </div>
  );
};

export default EventSpeakersCard;