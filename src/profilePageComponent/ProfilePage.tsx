
import AccountInfoCard from "./AccountInfoCard";
import DashboardSidebar from "./DashboardSidebar";
import PersonalInfoCard from "./PersonalInfoCard";
import ProfileBanner from "./ProfileBanner";
import "./ProfilePage.css"
import QuickActionsCard from "./QuickActionsCard";
import {
  Bell,
  ChevronDown,
  Search,
} from "lucide-react";


const ProfilePage = () => {
  return (
    <div className="zenProfileLayout">
      <DashboardSidebar />

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