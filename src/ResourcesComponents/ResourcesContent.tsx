
import { useState, useEffect } from "react";
import "../../src/EventsComponents/Event.css"
import DashboardSidebar from "../profilePageComponent/DashboardSidebar";
import AllResourcesSection from "./AllResourcesSection";
import RecentAccessSection from "./RecentAccessSection";
import ResourceFilters from "./ResourceFilters";
import ResourcesHeader from "./ResourcesHeader";
import ResourcesTabs from "./ResourcesTabs";
import "./ResourcesContent.css"
import {
  Bell,
  ChevronDown,
  Search,
  Menu,
} from "lucide-react";
import type { Resource } from "../types/Resources";

const ResourcesContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("resources");
  const [activeFilter, setActiveFilter] = useState("all");
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [resources, setResources] = useState<Resource[]>([]);

    useEffect(() => {
  const fetchResources = async () => {
    try {
      const response = await fetch(
        "https://ambchapcorps.org/api/resources"
      );

      const data = await response.json();

      setResources(data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  fetchResources();
}, []);

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

                {/* Mobile Header */}
                <div className="orionTopBarShellMobile">
                    <div className="orionTopBarShellMobile-left">
                        <button
                            className="orionMobileMenuButton"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu size={22} />
                        </button>

                        <p className="dashboard-p">Resources</p>
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

        {/* end of mobile header */}

        <div className="resourcesWrapper">
          <ResourcesHeader />

          <ResourcesTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <ResourceFilters
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />

            <RecentAccessSection
                resources={resources.slice(0, 4)}
            />

            <AllResourcesSection
                resources={resources}
            />

        </div>

      </div>
    </div>
  );
};

export default ResourcesContent;