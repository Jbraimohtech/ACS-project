import {
  ChevronLeft,
  MapPin,
  Users,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";
import "./EventContentPage.css"
import DashboardSidebar from "../profilePageComponent/DashboardSidebar";
import { useState } from "react";
import EventCard from "./EventCard";
import { useNavigate } from "react-router-dom";
import EmptyPastEvents from "../dashEventDetailComponents/EmptyPastEvents";

const EventContentPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const navigate = useNavigate();

  const goToEventDetailsPage = () => {
    navigate("/event-detail-page")
  }
  
    return (
    <div className="zenProfileLayout">
        <DashboardSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
        />
        <div className="orionMainContent">
            {/* TOP BAR */}

            <div className="orionTopBarShell">
                <div className="orionSearchCluster">
                    <Search
                    size={16}
                    className="orionSearchIcon"
                    />

                    <input
                    type="text"
                    placeholder="Search members, events,..."
                    className="orionSearchInput"
                    />
                </div>

                    <div className="orionTopBarActions">
                        {/* NOTIFICATION */}

                        <button className="orionNotificationButton">
                        <Bell size={18} />

                        <span className="orionNotificationDot"></span>
                        </button>

                        {/* USER */}

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
            
            <div className="stellarEventsWrapper">

            {/* Header */}

            <div className="stellarEventsHeader">

                <div className="stellarEventsBreadcrumb">
                <ChevronLeft size={18} />
                <span>Payment</span>
                </div>

                <h1 className="stellarEventsTitle">
                Events
                </h1>

                <p className="stellarEventsSubtitle">
                Manage your subscription, payments method,
                and billing history
                </p>
            </div>

            {/* Tabs */}

            <div className="stellarEventsTabs">
                <button
                    className={
                    activeTab === "upcoming"
                        ? "stellarTabActive"
                        : ""
                    }
                    onClick={() => setActiveTab("upcoming")}
                >
                    Upcoming Events
                </button>

                <button
                    className={
                    activeTab === "past"
                        ? "stellarTabActive"
                        : ""
                    }
                    onClick={() => setActiveTab("past")}
                >
                    Past Events
                </button>
                </div>

                {/* CONDITIONAL CONTENT */}

                {activeTab === "past" ? (
                <EmptyPastEvents />
                ) : (
                <>
                    {/* Featured */}

                    <h3 className="stellarSectionTitle">
                    Featured Events
                    </h3>

                    <div className="stellarFeaturedCard">
                    <div className="stellarDateBlock">
                        <span>Thur</span>

                        <h2>04</h2>

                        <p>SEP</p>

                        <p>2026</p>
                    </div>

                    <div className="stellarEventImage"></div>

                    <div className="stellarEventInfo">
                        <h2>
                        Annual Tech
                        <br />
                        Symposium 2024
                        </h2>

                        <div className="stellarEventLocation">
                        <MapPin size={14} />

                        <span>
                            Las vegas convention center,
                            las vegas, USA
                        </span>
                        </div>

                        <p>
                        Join industry leaders for a two-day
                        deep dive into the future of AI,
                        decentralized networks, and the
                        evolution of digital ecosystems.
                        </p>

                        <div className="stellarAttendance">
                        <Users size={13} />
                        450+ attending
                        </div>

                        <div className="stellarEventActions">
                        <button className="stellarRSVPButton">
                            RSVP
                        </button>

                        <button
                            className="stellarDetailsButton"
                            onClick={goToEventDetailsPage}
                        >
                            View details
                        </button>
                        </div>
                    </div>
                    </div>

                    {/* Upcoming */}

                    <h3 className="stellarSectionTitle">
                    All Upcoming Events
                    </h3>

                    <div className="stellarEventsList">
                    <EventCard />
                    <EventCard />
                    <EventCard />
                    </div>
                </>
                )}
            </div>
        </div>
    </div>
  );
};

export default EventContentPage