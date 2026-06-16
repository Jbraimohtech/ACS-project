import DashboardSidebar from "../profilePageComponent/DashboardSidebar";
import "./DashboardPage.css";
import {
  Calendar,
  CreditCard,
  MessageCircle,
  User,
  Bell,
  ChevronDown,
  Search,
    Menu,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { User as UserType } from "../types/User";

const DashboardPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await fetch(
        "https://ambchapcorps.org/api/user"
      );

      const data = await response.json();

      setUser(data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);

if (loading) {
  return (
    <div className="profileLoading">
      Loading dashboard...
    </div>
  );
}

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
                      src={
                        user?.profile_image
                          ? `https://ambchapcorps.org/storage/${user.profile_image}`
                          : "/profile.jpg"
                      }
                      alt="User"
                      className="orionUserAvatar"
                      onError={(e) => {
                        e.currentTarget.src = "/profile.jpg";
                      }}
                    />

                    <div className="orionUserMeta">
                        <h4>
                          {user?.first_name} {user?.last_name}
                        </h4>

                        <span>
                          {user?.membership_id
                            ? `ID: ${user.membership_id}`
                            : `User #${user?.id}`}
                        </span>
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
        
    <div className="dashboardHeader-spacing">

      {/* Header */}
      <div className="dashboardHeader">
        <div>
          <h1>
            Welcome back, {user?.first_name}!
          </h1>
          <p>Your account is in good standing. 4 updates need attention.</p>
        </div>

        <div className="dashboardIcons">
          <Bell size={18} />
          <img
            src="/profile.jpg"
            alt=""
            className="dashboardAvatar"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="statsGrid">

        <div className="statCard active">
          <User size={18} />
          <h3>
            {user?.status?.toUpperCase()}
          </h3>

          <p>Account Status</p>

          <span>
            ● {user?.status}
          </span>
        </div>

        <div className="statCard">
          <CreditCard size={18} />
          <h3>$149.00</h3>
          <p>Next payment</p>
          <span>Due on the 12th, 2025</span>
        </div>

        <div className="statCard">
          <Calendar size={18} />
          <h3>3 Live Sessions</h3>
          <p>Upcoming Events</p>
          <span>View schedule</span>
        </div>

        <div className="statCard">
          <MessageCircle size={18} />
          <h3>5 unread</h3>
          <p>Notifications</p>
          <span>Actions required</span>
        </div>

      </div>

      {/* Main Grid */}
      <div className="dashboardGrid">

        <div>

          {/* Upcoming Events */}
          <section className="dashboardSection">
            <div className="sectionHeader">
              <h2>Upcoming events</h2>
            </div>

            <div className="eventCard">
              <div>
                <small>10:00AM</small>
                <h4>Annual meetup</h4>
                <p>Aug 12 • Lagos</p>
              </div>

              <button>View</button>
            </div>

            <div className="eventCard">
              <div>
                <small>10:00AM</small>
                <h4>Annual meetup</h4>
                <p>Aug 12 • Lagos</p>
              </div>

              <button>View</button>
            </div>
          </section>

          {/* Announcements */}
          <section className="dashboardSection">
            <div className="sectionHeader">
              <h2>Announcement</h2>
            </div>

            <div className="listItem">
              Meeting with a client
            </div>

            <div className="listItem">
              Meeting with a client
            </div>

            <div className="listItem">
              Meeting with a client
            </div>
          </section>

        </div>

        <div>

          {/* Attendance */}
          <section className="dashboardSection">
            <div className="sectionHeader">
              <h2>Attendance History</h2>
            </div>

            <div className="listItem">
              Meeting with a client
            </div>

            <div className="listItem">
              Meeting with a client
            </div>

            <div className="listItem">
              Meeting with a client
            </div>
          </section>

          {/* Resources */}
          <section className="dashboardSection">
            <div className="sectionHeader">
              <h2>Quick Resources</h2>
            </div>

            <div className="listItem">
              Brand Guidelines
            </div>

            <div className="listItem">
              Brand Guidelines
            </div>

            <div className="listItem">
              Brand Guidelines
            </div>
          </section>

        </div>

        {/* Right Column */}
        <div>

          <div className="profileCard">
            <img
              src={
                user?.profile_image
                  ? `https://ambchapcorps.org/storage/${user.profile_image}`
                  : "/profile.jpg"
              }
              alt="Profile"
            />

            <h3>
              {user?.first_name} {user?.last_name}
            </h3>

            <p>
              {user?.email}
            </p>

            <button>
              View Profile
            </button>
          </div>

          <div className="quickActions">
            <h4>Quick Action</h4>

            <button>View Billing History</button>
            <button>Profile Settings</button>
            <button>Security Settings</button>
          </div>

        </div>
        </div>

      </div>
      </div>

    </div>
  );
};

export default DashboardPage;