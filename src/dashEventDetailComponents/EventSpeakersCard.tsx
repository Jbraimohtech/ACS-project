import "./EventSpeakersCard.css";

interface Speaker {
  id: number;
  name: string;
  title: string;
  image: string;
}

type SpeakerInput = Partial<Speaker> & {
  id?: number;
  name?: string;
  title?: string;
  image?: string;
  first_name?: string;
  last_name?: string;
  profile_image?: string | null;
};

interface EventSpeakersCardProps {
  speakers: SpeakerInput[];
}

const getSpeakerImage = (image?: string | null) => {
  if (!image) {
    return "/profile.jpg";
  }

  if (image.startsWith("http")) {
    return image;
  }

  return `https://ambchapcorps.org/storage/${image}`;
};

const EventSpeakersCard = ({
  speakers,
}: EventSpeakersCardProps) => {
  const normalizedSpeakers = speakers.map((speaker, index) => ({
    id: speaker.id ?? index + 1,
    name:
      speaker.name ||
      [speaker.first_name, speaker.last_name].filter(Boolean).join(" ") ||
      "Speaker",
    title: speaker.title || "Event Organizer",
    image: speaker.image || speaker.profile_image || "",
  }));

  return (
    <div className="orionSpeakersCard">
      <h3 className="orionSpeakersTitle">
        Featured Speakers
      </h3>

      {normalizedSpeakers.length > 0 ? (
        normalizedSpeakers.map((speaker) => (
          <div
            className="orionSpeakerItem"
            key={speaker.id}
          >
            <img
              src={getSpeakerImage(speaker.image)}
              alt={speaker.name}
              className="orionSpeakerAvatar"
              onError={(e) => {
                e.currentTarget.src = "/profile.jpg";
              }}
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

      {normalizedSpeakers.length > 3 && (
        <button className="orionViewAllSpeakers">
          View All {normalizedSpeakers.length} Speakers
        </button>
      )}
    </div>
  );
};

export default EventSpeakersCard;