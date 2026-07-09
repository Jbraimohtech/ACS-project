import "./EventHeroSection.css";

interface Event {
  id: number;
  image: string;
  user_id: number;
  zone_id: number | null;
  title: string;
  dress_code: string;
  wifi: string;
  date: string;
  description: string;
  venue: string;
  is_featured: number;

  created_at: string;
  updated_at: string;

  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };

  zone: unknown;
}

interface EventHeroSectionProps {
  event: Event;
}

const EventHeroSection = ({
  event,
}: EventHeroSectionProps) => {
  const imageSrc = event.image
    ? event.image.startsWith("http")
      ? event.image
      : `https://ambchapcorps.org/storage/${event.image}`
    : "/profile.jpg";

  return (
    <div
      className="auroraHeroCard"
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      <img src={imageSrc} alt={event.title} className="auroraHeroImage" />

      <div className="auroraHeroOverlay">
        <span className="auroraBadge">
           EVENT
        </span>

        <h1>{event.title}</h1>

        <p>
          {event.date} • {event.venue}
        </p>
      </div>
    </div>
  );
};

export default EventHeroSection;