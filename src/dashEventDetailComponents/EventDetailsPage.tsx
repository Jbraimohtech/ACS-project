import {
  Bell,
  Search,
  Menu,
} from "lucide-react";
import { useState, useEffect, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./EventDetailsPage.css";
import DashboardSidebar from "../profilePageComponent/DashboardSidebar";
import EventHeroSection from "./EventHeroSection";
import EventAboutCard from "./EventAboutCard";
import EventInfoCard from "./EventInfoCard";
import EventScheduleCard from "./EventScheduleCard";
import EventSpeakersCard from "./EventSpeakersCard";
import EventVenueCard from "./EventVenueCard";
import LoadingBrand from "../components/LoadingBrand";
import DashboardUserProfileWidget from "../components/DashboardUserProfileWidget";


interface Schedule {
  id: number;
  title: string;
  speaker: string;
  venue: string;
  time: string;
  duration: string;
}

interface Speaker {
  id: number;
  name: string;
  title: string;
  image: string;
}

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

  schedules: Schedule[];
  speakers: Speaker[];

  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };

  zone: unknown;
}


interface EventResponse {
  status: string;
  data: Event;
}

const EventDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = formData.get("query")?.toString().trim() || "";

    if (query) {
      navigate(`/member-search?query=${encodeURIComponent(query)}`);
    }
  };

  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
  return;
}

    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://ambchapcorps.org/api/event/${id}`
        );

        if (!response.ok) {
          if (response.status === 404) {

            throw new Error(`https://ambchapcorps.org/api/event/${id} Event not found`);
          }
          throw new Error(`API Error: ${response.status}`);
        }

        const data: EventResponse =
          await response.json();

        console.log("Event details response:", data);

        // Handle both { status, data: {...} } and direct event object responses
        const eventData = data.data || data;
        if (eventData && eventData.id) {
          setEvent(eventData);
        } else {
          setError("No event data received from server");
        }
      } catch (err) {
        console.error("Error fetching event:", err);
        const errorMessage = err instanceof Error ? err.message : "Failed to load event";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (isLoading) {
    return (
      <div className="zenProfileLayout">
        <DashboardSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="orionMainContent">
          <LoadingBrand />
        </div>
      </div>
    );
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!event) {
    return <h2>No event found</h2>;
  }

  return (
    <div className="zenProfileLayout">
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="orionMainContent">
        {/* Desktop Header */}
        <div className="orionTopBarShell">
          <form className="orionSearchCluster" onSubmit={handleSearchSubmit}>
            <Search
              size={16}
              className="orionSearchIcon"
            />

            <input
              type="text"
              name="query"
              placeholder="Search for members"
              className="orionSearchInput"
            />
          </form>

          <div className="orionTopBarActions">
            <button className="orionNotificationButton">
              <Bell size={18} />
              <span className="orionNotificationDot"></span>
            </button>

            <DashboardUserProfileWidget />
          </div>
        </div>

        {/* Mobile Header */}
        <div className="orionTopBarShellMobile">
          <div className="orionTopBarShellMobile-left">
            <button
              className="orionMobileMenuButton"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>

            <p className="dashboard-p">Events</p>
          </div>

          <div className="orionMobileLogo-crop">
            {!showMobileSearch ? (
              <button
                className="orionMobileSearchTrigger"
                onClick={() =>
                  setShowMobileSearch(true)
                }
              >
                <Search size={22} />
              </button>
            ) : (
              <form className="orionSearchCluster" onSubmit={handleSearchSubmit}>
                <Search
                  size={16}
                  className="orionSearchIcon"
                />

                <input
                  autoFocus
                  type="text"
                  name="query"
                  placeholder="Search for members"
                  className="orionSearchInput"
                />

                <button
                  type="button"
                  className="orionMobileSearchClose"
                  onClick={() =>
                    setShowMobileSearch(false)
                  }
                >
                  ✕
                </button>
              </form>
            )}

            <div className="notify-icon-profile-box">
              <div className="notify-icon-profile"></div>
            </div>

            <div className="notify-icon-profile-box">
              <div className="profile-image-small"></div>
            </div>
          </div>
        </div>

        {/* Event Content */}
        <div className="stellarEventDetailsWrapper">
          <div className="stellarEventBreadcrumb">
            EVENTS • {event.title}
          </div>

          <div className="stellarEventTopGrid">
            <EventHeroSection event={event} />

            <div className="stellarEventRightColumn">
              <EventAboutCard event={event} />
            </div>
          </div>

          <div className="stellarEventBottomGrid">
            <div>
              <div className="stellarEventAboutSection-small">
                <EventAboutCard event={event} />
              </div>
              <EventScheduleCard
                schedules={event.schedules}
              />
            </div>

            <div className="stellarEventSidebar">
              <EventSpeakersCard
                speakers={event.speakers}
              />
              <EventVenueCard event={event} />
              <EventInfoCard event={event} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;