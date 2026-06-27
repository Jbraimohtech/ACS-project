import DashboardSidebar from "../profilePageComponent/DashboardSidebar";
import EditProfile from "./EditProfile";
import "./EditProfile.css";
import "../profilePageComponent/ProfilePage.css";
import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { useState } from "react";

const EditProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="zenProfileLayout">
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="orionMainContent">
        <div className="orionTopBarShell">
          <button className="orionSidebarToggle" onClick={() => setSidebarOpen(true)}>
            <Menu size={18} />
          </button>

          <div className="orionSearchCluster">
            <Search size={16} className="orionSearchIcon" />
            <input
              type="text"
              placeholder="Search members, events,..."
              className="orionSearchInput"
            />
          </div>

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