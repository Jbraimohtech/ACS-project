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
import { getToken, getUser, setUser as persistUser } from "../utils/auth";
import type { User as UserType } from "../types/User";

const DashboardPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [user, setUser] = useState<UserType | null>(() => {
      const storedUser = getUser();
      if (!storedUser) return null;
      if (Array.isArray(storedUser)) {
        return storedUser.length > 0 ? (storedUser[0] as UserType) : null;
      }
      return storedUser as UserType;
    });

    const initials = user
      ? (user.first_name?.[0] || user.last_name?.[0] || user.email?.[0] || "?").toUpperCase()
      : "";

    useEffect(() => {
      const token = getToken();
      if (!token) {
        return;
      }

      const fetchUser = async () => {
        try {
          const response = await fetch(
            "https://ambchapcorps.org/api/user",
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            return;
          }

          const data = await response.json();
          let apiUser: unknown = data.user ?? data.data ?? data;

          if (Array.isArray(apiUser)) {
            apiUser = apiUser.length > 0 ? apiUser[0] : null;
          }

          if (apiUser && typeof apiUser === "object") {
            const parsedUser = apiUser as UserType;
            // Validate that this is not a default/demo user (super or admin)
            const firstName = parsedUser.first_name?.toLowerCase() || "";
            const lastName = parsedUser.last_name?.toLowerCase() || "";
            const email = parsedUser.email?.toLowerCase() || "";
            
            const isDefaultUser =
              firstName === "super" ||
              lastName === "super" ||
              email === "super@example.com" ||
              firstName === "admin" ||
              lastName === "admin" ||
              email === "admin@example.com";

            // Only update if it's a real user, not a default/demo account
            if (!isDefaultUser) {
              setUser(parsedUser);
              persistUser(parsedUser);
            }
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchUser();
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
                      {user?.profile_image ? (
                        <img
                          src={`https://ambchapcorps.org/storage/${user.profile_image}`}
                          alt="User"
                          className="orionUserAvatar"
                          onError={(e) => {
                            e.currentTarget.src = "/profile.jpg";
                          }}
                        />
                      ) : (
                        <div className="orionUserAvatarInitials">
                          {initials}
                        </div>
                      )}

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
          {user?.profile_image ? (
            <img
              src={`https://ambchapcorps.org/storage/${user.profile_image}`}
              alt="Profile"
              className="dashboardAvatar"
            />
          ) : (
            <div className="dashboardAvatarInitials">{initials}</div>
          )}
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