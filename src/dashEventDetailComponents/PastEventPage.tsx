
import DashboardSidebar from "../profilePageComponent/DashboardSidebar";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import "./PastEventPage.css";
import PastEventCard from "./PastEventCard";
import {
  Search,
  Bell,
  Menu,
} from "lucide-react";
import PastEventsPagination from "./PastEventPagination";
import PastEventsFilters from "./PastEventFilter";
import PastEventsHeader from "./PastEventsHeader";
import DashboardUserProfileWidget from "../components/DashboardUserProfileWidget";
import { Helmet } from "react-helmet";

const PastEventsPage = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] =
    useState(false);
const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = formData.get("query")?.toString().trim() || "";

    if (query) {
      navigate(`/member-search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="zenProfileLayout">
        <Helmet>
            <title>Past Events - Ambassadors Chaplain Corps</title>
            <meta name="description" content="Explore past events and activities organized by the Ambassadors Chaplain Corps." />
            <meta name="keywords" content="past events, ambassadors, chaplain, corps, activities, community" />
        </Helmet>
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
        <div className="orionMainContent">
            {/* TOP BAR */}

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
                    {/* NOTIFICATION */}

                    <button className="orionNotificationButton">
                    <Bell size={18} />

                    <span className="orionNotificationDot"></span>
                    </button>

                    {/* USER */}

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

                        <p className="dashboard-p">Dashboard</p>
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

        {/* end of mobile header */}

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