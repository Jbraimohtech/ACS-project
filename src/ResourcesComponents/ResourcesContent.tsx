
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
  Search,
  Menu,
} from "lucide-react";
import type { Resource } from "../types/Resources";
import LoadingBrand from "../components/LoadingBrand";
import DashboardUserProfileWidget from "../components/DashboardUserProfileWidget";
import { getToken } from "../utils/auth";

const ResourcesContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("resources");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const token = getToken();
        const response = await fetch(
          "https://ambchapcorps.org/api/dashboard/resources",
          {
            headers: {
              Accept: "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Unable to load resources");
        }

        const data = await response.json().catch(() => ({}));
        const list = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data)
            ? data
            : [];

        setResources(
          list.map((item: Record<string, unknown>) => ({
            id: Number(item.id ?? 0),
            user_id: Number(item.user_id ?? 0),
            title: String(item.title ?? "Untitled resource"),
            description: String(item.description ?? ""),
            file: String(item.file ?? ""),
            type: String(item.type ?? "pdf"),
            created_at: String(item.created_at ?? ""),
            updated_at: String(item.updated_at ?? ""),
            download_url: item.download_url ? String(item.download_url) : undefined,
          })) as Resource[]
        );
      } catch (error) {
        console.error(error);
        setResources([]);
      } finally {
        setIsLoading(false);
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

            {isLoading ? (
              <LoadingBrand />
            ) : (
              <>
                <RecentAccessSection
                  resources={resources.slice(0, 4)}
                />

                <AllResourcesSection
                  resources={resources}
                />
              </>
            )}

        </div>

      </div>
    </div>
  );
};

export default ResourcesContent;