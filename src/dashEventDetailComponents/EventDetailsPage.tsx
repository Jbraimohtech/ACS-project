import {
  Bell,
  ChevronDown,
  Search,
} from "lucide-react";
import EventAboutCard from "./EventAboutCard"
import "./EventDetailsPage.css"
import EventHeroSection from "./EventHeroSection"
import EventInfoCard from "./EventInfoCard"
import EventScheduleCard from "./EventScheduleCard"
import EventSpeakersCard from "./EventSpeakersCard"
import EventStatsCard from "./EventStatsCard"
import EventVenueCard from "./EventVenueCard"
import { useState } from "react";
import DashboardSidebar from "../profilePageComponent/DashboardSidebar";

const EventDetailsPage = () => {
   const [sidebarOpen, setSidebarOpen] = useState(false);
  
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
     <div className="stellarEventDetailsWrapper">
      {/* Breadcrumb */}

      <div className="stellarEventBreadcrumb">
        EVENTS  ANNUAL TECH SYMPOSIUM 2024
      </div>

      {/* TOP GRID */}

      <div className="stellarEventTopGrid">
        <EventHeroSection />

        <div className="stellarEventRightColumn">
          <EventStatsCard />
        </div>
      </div>

      {/* LOWER GRID */}

      <div className="stellarEventBottomGrid">
        <div>
          <EventAboutCard />

          <EventScheduleCard />
        </div>

        <div className="stellarEventSidebar">
          <EventSpeakersCard />

          <EventVenueCard />

          <EventInfoCard />
        </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default EventDetailsPage