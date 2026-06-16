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
  return (
    <div className="auroraHeroCard">
      <div className="auroraHeroImage"></div>

      <div className="auroraHeroOverlay">
        <span className="auroraBadge">
          FLAGSHIP EVENT
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