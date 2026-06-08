
import DashboardSidebar from "../profilePageComponent/DashboardSidebar";
import { useState } from "react";

import "./PastEventPage.css";
import PastEventCard from "./PastEventCard";
import {
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";
import PastEventsPagination from "./PastEventPagination";
import PastEventsFilters from "./PastEventFilter";
import PastEventsHeader from "./PastEventsHeader";

const PastEventsPage = () => {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="zenProfileLayout">
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

        <div className="make-it-column">
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

        <div className="orionMainContent-margin">
            <PastEventsHeader />

            <PastEventsFilters />

            <div className="novaEventsGrid">
            {Array.from({ length: 9 }).map(
                (_, index) => (
                <PastEventCard key={index} />
                )
            )}
            </div>

            <PastEventsPagination />
        </div>
        </div>
      
    </div>
  );
};

export default PastEventsPage;