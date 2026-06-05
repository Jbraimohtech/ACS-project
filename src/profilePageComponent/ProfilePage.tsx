


import AccountInfoCard from "./AccountInfoCard";
import DashboardSidebar from "./DashboardSidebar";
import PersonalInfoCard from "./PersonalInfoCard";
import ProfileBanner from "./ProfileBanner";
import "./ProfilePage.css"
import QuickActionsCard from "./QuickActionsCard";
import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Search,
//   Menu,
} from "lucide-react";


const ProfilePage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
//     const [showMobileSearch, setShowMobileSearch] =
//   useState(false);

  return (
    <div className="zenProfileLayout">
       <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

        <div className="orionMainContent">
            {/* MOBILE MENU */}
        
        {/* <div className="orionTopBarShellMobile">
            <button
                className="orionMobileMenuButton"
                onClick={() => setSidebarOpen(true)}
            >
                <Menu size={22} />
            </button>
            
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
        </div> */}

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



            <main className="zenProfileContent">
                <ProfileBanner />

                <section className="zenProfileCardsRow">
                    <PersonalInfoCard />
                    <AccountInfoCard />
                    <QuickActionsCard />
                </section>
            </main>
        </div>
    </div>
  );
}

export default ProfilePage