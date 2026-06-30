
import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
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
import { API_BASE } from "../utils/api";

const ResourcesContent = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("resources");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = formData.get("query")?.toString().trim() || "";

    if (query) {
      navigate(`/member-search?query=${encodeURIComponent(query)}`);
    }
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const token = getToken();
        const response = await fetch(`${API_BASE}/dashboard/resources`, {
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
                <form className="orionSearchCluster" onSubmit={handleSearchSubmit}>
                    <Search
                    size={16}
                    className="orionSearchIcon"
                    />

                    <input
                    autoFocus
                    type="text"
                    name="query"
                    placeholder="Search members, events..."
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