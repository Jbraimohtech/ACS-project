import DashboardSidebar from "../profilePageComponent/DashboardSidebar";
import EditProfile from "./EditProfile";
import "./EditProfile.css";
import "../profilePageComponent/ProfilePage.css";
import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="orionMainContent">
        <div className="orionTopBarShell">
          <button className="orionSidebarToggle" onClick={() => setSidebarOpen(true)}>
            <Menu size={18} />
          </button>

          <form className="orionSearchCluster" onSubmit={handleSearchSubmit}>
            <Search size={16} className="orionSearchIcon" />
            <input
              type="text"
              name="query"
              placeholder="Search members, events,..."
              className="orionSearchInput"
            />
          </form>

          <div className="orionTopBarActions">
            <button className="orionNotificationButton">
              <Bell size={18} />
              <span className="orionNotificationDot"></span>
            </button>

            <div className="orionUserProfileWidget">
              <div className="orionUserAvatar">E</div>

              <div className="orionUserMeta">
                <h4>Member</h4>
                <span>User Account</span>
              </div>

              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        <EditProfile />
      </div>
    </div>
  );
};

export default EditProfilePage;