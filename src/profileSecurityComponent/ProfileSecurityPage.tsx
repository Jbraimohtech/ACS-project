import "./ProfileSecurity.css"
import DashboardSidebar from "../profilePageComponent/DashboardSidebar"
import "../profileEditComponents/EditProfile.css"
import {
  Bell,
  ChevronDown,
  Search,
} from "lucide-react";
import ProfileSecurity from "./ProfileSecurity";
import { useState } from "react";

const ProfileSecurityPage = () => {
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
            <ProfileSecurity />
        </div>
    </div>
  )
}

export default ProfileSecurityPage