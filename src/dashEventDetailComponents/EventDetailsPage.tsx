import {
  Bell,
  ChevronDown,
  Search,
  Menu,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./EventDetailsPage.css";
import DashboardSidebar from "../profilePageComponent/DashboardSidebar";
import EventHeroSection from "./EventHeroSection";
import EventAboutCard from "./EventAboutCard";
import EventInfoCard from "./EventInfoCard";
import EventScheduleCard from "./EventScheduleCard";
import EventSpeakersCard from "./EventSpeakersCard";
import EventVenueCard from "./EventVenueCard";


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
  const { id } = useParams();

  

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
  return;
}

    const fetchEvent = async () => {
      try {
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
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
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
          <div className="orionSearchCluster">
            <Search
              size={16}
              className="orionSearchIcon"
            />

            <input
              type="text"
              placeholder="Search members, events..."
              className="orionSearchInput"
            />
          </div>

          <div className="orionTopBarActions">
            <button className="orionNotificationButton">
              <Bell size={18} />
              <span className="orionNotificationDot"></span>
            </button>

            <div className="orionUserProfileWidget">
              <img
                src="/profile.jpg"
                alt="User"
                className="orionUserAvatar"
              />

              <div className="orionUserMeta">
                <h4>Chukwutem Emmanuel</h4>
                <span>User ID: 12345434</span>
              </div>

              <ChevronDown size={16} />
            </div>
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
              <div className="orionSearchCluster">
                <Search
                  size={16}
                  className="orionSearchIcon"
                />

                <input
                  autoFocus
                  type="text"
                  placeholder="Search members, events..."
                  className="orionSearchInput"
                />

                <button
                  className="orionMobileSearchClose"
                  onClick={() =>
                    setShowMobileSearch(false)
                  }
                >
                  ✕
                </button>
              </div>
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
              <EventAboutCard event={event} />
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