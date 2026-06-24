import {
  ChevronLeft,
  Search,
  Bell,
  ChevronDown,
  Menu,
} from "lucide-react";

import "./EventContentPage.css";
import DashboardSidebar from "../profilePageComponent/DashboardSidebar";
import EventCard from "./EventCard";
import EmptyPastEvents from "../dashEventDetailComponents/EmptyPastEvents";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";;

export interface Event {
  id: number;
  title: string;
  description: string;
  venue: string;
  date: string;
  image: string;
  dress_code: string;
  wifi: string;
  is_featured: number;
}

const EventContentPage = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [showMobileSearch, setShowMobileSearch] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState<"upcoming" | "past">(
      "upcoming"
    );

  const [searchTerm, setSearchTerm] =
    useState("");

  const [events, setEvents] =
    useState<Event[]>([]);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch(
          "https://ambchapcorps.org/api/event"
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        // Handle both wrapped { status, data: [...] } and direct array responses
        const eventsArray = data.data || data;
        setEvents(Array.isArray(eventsArray) ? eventsArray : []);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load events."
        );
      }
    };

    loadEvents();
  }, []);

  const today = useMemo(() => new Date(), []);

  const upcomingEvents = useMemo(
    () =>
      events.filter(
        (event) =>
          new Date(event.date) >= today
      ),
    [events, today]
  );

  const pastEvents = useMemo(
    () =>
      events.filter(
        (event) =>
          new Date(event.date) < today
      ),
    [events, today]
  );

  const featuredEvent =
    upcomingEvents.find(
      (event) =>
        event.is_featured === 1
    ) || upcomingEvents[0];

  const displayedEvents =
    activeTab === "upcoming"
      ? upcomingEvents
      : pastEvents;

  const filteredEvents =
    displayedEvents.filter(
      (event) =>
        event.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        event.venue
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  const goToEventDetailsPage = (
    id: number
  ) => {
    navigate(
      `/event-detail-page/${id}`
    );
  };

  if (error) {
    return (
      <div className="errorState">
        {error}
      </div>
    );
  }

  return (
    <div className="zenProfileLayout">
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={
          setSidebarOpen
        }
      />

      <div className="orionMainContent">

        {/* DESKTOP HEADER */}

        <div className="orionTopBarShell">
          <div className="orionSearchCluster">
            <Search
              size={16}
              className="orionSearchIcon"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              placeholder="Search events..."
              className="orionSearchInput"
            />
          </div>

          <div className="orionTopBarActions">

            <button className="orionNotificationButton">
              <Bell size={18} />
              <span className="orionNotificationDot" />
            </button>

            <div className="orionUserProfileWidget">
              <img
                src="/profile.jpg"
                alt="User"
                className="orionUserAvatar"
              />

              <div className="orionUserMeta">
                <h4>
                  Chukwutem Emmanuel
                </h4>

                <span>
                  User ID: 12345434
                </span>
              </div>

              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        {/* MOBILE HEADER */}

        <div className="orionTopBarShellMobile">

          <div className="orionTopBarShellMobile-left">

            <button
              className="orionMobileMenuButton"
              onClick={() =>
                setSidebarOpen(true)
              }
            >
              <Menu size={22} />
            </button>

            <p className="dashboard-p">
              Events
            </p>
          </div>

          <div className="orionMobileLogo-crop">

            {!showMobileSearch ? (
              <button
                className="orionMobileSearchTrigger"
                onClick={() =>
                  setShowMobileSearch(
                    true
                  )
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
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(
                      e.target.value
                    )
                  }
                  placeholder="Search events..."
                  className="orionSearchInput"
                />

                <button
                  className="orionMobileSearchClose"
                  onClick={() =>
                    setShowMobileSearch(
                      false
                    )
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

        {/* CONTENT */}

        <div className="stellarEventsWrapper">

          {/* PAGE HEADER */}

          <div className="stellarEventsHeader">

            <div className="stellarEventsBreadcrumb">
              <ChevronLeft size={18} />
              <span>Dashboard</span>
            </div>

            <h1 className="stellarEventsTitle">
              Events
            </h1>

            <p className="stellarEventsSubtitle">
              Browse and manage all
              community events.
            </p>
          </div>

          {/* STATS */}

          <div className="eventStatsGrid">
            <div className="eventStatCard">
              <h3>{events.length}</h3>
              <p>Total Events</p>
            </div>

            <div className="eventStatCard">
              <h3>
                {upcomingEvents.length}
              </h3>
              <p>Upcoming</p>
            </div>

            <div className="eventStatCard">
              <h3>
                {pastEvents.length}
              </h3>
              <p>Past Events</p>
            </div>
          </div>

          {/* TABS */}

          <div className="stellarEventsTabs">

            <button
              className={
                activeTab ===
                "upcoming"
                  ? "stellarTabActive"
                  : ""
              }
              onClick={() =>
                setActiveTab(
                  "upcoming"
                )
              }
            >
              Upcoming (
              {
                upcomingEvents.length
              }
              )
            </button>

            <button
              className={
                activeTab === "past"
                  ? "stellarTabActive"
                  : ""
              }
              onClick={() =>
                setActiveTab("past")
              }
            >
              Past (
              {pastEvents.length})
            </button>
          </div>

          {/* FEATURED EVENT */}

          {activeTab ===
            "upcoming" &&
            featuredEvent && (
              <>
                <h3 className="stellarSectionTitle">
                  Featured Event
                </h3>

                <div className="stellarFeaturedCard">

                  <div className="stellarDateBlock">
                    {(() => {
                      const date = new Date(featuredEvent.date);
                      const day = date.toLocaleDateString("en-US", { weekday: "short" });
                      const dateNum = date.getDate();
                      const month = date.toLocaleDateString("en-US", { month: "short" });
                      const year = date.getFullYear();

                      return (
                        <>
                          <span>
                            {day}
                          </span>

                          <h2>
                            {dateNum}
                          </h2>

                          <p>
                            {month}
                          </p>

                          <p>
                            {year}
                          </p>
                        </>
                      );
                    })()}
                  </div>

                  <div className="stellarEventImage">
                    <img
                      src={`https://ambchapcorps.org/storage/events/${featuredEvent.image}`}
                      alt={
                        featuredEvent.title
                      }
                    />
                  </div>

                  <div className="stellarEventInfo">

                    <h2>
                      {
                        featuredEvent.title
                      }
                    </h2>

                    <p>
                      {
                        featuredEvent.venue
                      }
                    </p>

                    <p>
                      {
                        featuredEvent.description
                      }
                    </p>

                    <button
                      className="stellarDetailsButton"
                      onClick={() =>
                        goToEventDetailsPage(
                          featuredEvent.id
                        )
                      }
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </>
            )}

          {/* EVENTS */}

          <h3 className="stellarSectionTitle">
            {activeTab ===
            "upcoming"
              ? "Upcoming Events"
              : "Past Events"}
          </h3>

          {filteredEvents.length ===
          0 ? (
            <EmptyPastEvents />
          ) : (
            <div className="stellarEventsList">
              {filteredEvents.map(
                (event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventContentPage;