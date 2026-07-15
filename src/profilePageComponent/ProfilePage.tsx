
import AccountInfoCard from "./AccountInfoCard";
import DashboardSidebar from "./DashboardSidebar";
import PersonalInfoCard from "./PersonalInfoCard";
import ProfileBanner from "./ProfileBanner";
import "./ProfilePage.css"
import QuickActionsCard from "./QuickActionsCard";
import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getProfileImageUrl, getToken, getUser, normalizeUserPayload, extractDashboardUser, setUser as persistUser } from "../utils/auth";
import { API_BASE } from "../utils/api";
import {
  Bell,
  ChevronDown,
  Search,
  Menu,
} from "lucide-react";
import type { User } from "../types/User";
import { Helmet } from "react-helmet";


// interface User {
//   id: number;
//   first_name: string;
//   last_name: string;
//   profile_image: string | null;
//   gender: string | null;
//   email: string;
//   phone: string | null;
//   membership_id: string | null;
//   status: string;
//   payment_status: number;
//   created_at: string;

//   zone: {
//     id: number;
//     name: string;
//   } | null;
// }

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(() => {
      const storedUser = getUser();
      if (!storedUser) return null;
      if (Array.isArray(storedUser)) {
        return storedUser.length > 0 ? (storedUser[0] as User) : null;
      }
      return storedUser as User;
    });
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showMobileSearch, setShowMobileSearch] =
  useState(false);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = formData.get("query")?.toString().trim() || "";

    if (query) {
      navigate(`/member-search?query=${encodeURIComponent(query)}`);
    }
  };

  
  useEffect(() => {
  const token = getToken();
  if (!token) {
    return;
  }

  const fetchUser = async () => {
    try {
      const response = await fetch(`${API_BASE}/dashboard`, {
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
      const apiUser = extractDashboardUser(data);
      const normalizedUser = normalizeUserPayload(apiUser);

      if (normalizedUser) {
        const apiUser = normalizedUser as unknown as User;
        const firstName = (apiUser.first_name ?? "").toLowerCase();
        const lastName = (apiUser.last_name ?? "").toLowerCase();
        const email = (apiUser.email ?? "").toLowerCase();

        const isDefaultUser =
          firstName === "super" ||
          lastName === "super" ||
          email === "super@example.com" ||
          firstName === "admin" ||
          lastName === "admin" ||
          email === "admin@example.com";

        if (!isDefaultUser) {
          setUser(apiUser);
          persistUser(apiUser);
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
      <Helmet>
        <title>Profile - Ambassadors Chaplain Corps</title>
        <meta name="description" content="View and manage your profile information, account settings, and quick actions for the Ambassadors Chaplain Corps." />
        <meta name="keywords" content="profile, account settings, personal information, ambassadors, chaplain, corps" />
      </Helmet>
       <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

        <div className="orionMainContent">
            {/* MOBILE MENU */}
        
            <div className="orionTopBarShellMobile">
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

                    <div className="notify-icon-profile"></div>
                    <div className="notify-icon-profile-box">
                        {/* <div className="profile-image-small">

                        </div> */}
                        <img
                            src={getProfileImageUrl(user?.profile_image)}
                            alt="Profile"
                            className="profile-image-small"
                            onError={(e) => {
                                e.currentTarget.src = "../assets/images/imageProfile-demo.jpeg";
                            }}
                            />
                        
                    </div>
                </div>
            </div>

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

                    <div className="orionUserProfileWidget">
                    <img
                        src={getProfileImageUrl(user?.profile_image)}
                        alt={`${user?.first_name} ${user?.last_name}`}
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



            <main className="zenProfileContent">
                <ProfileBanner user={user} />

                <section className="zenProfileCardsRow">
                    <PersonalInfoCard user={user} />
                    <AccountInfoCard user={user} />
                    <QuickActionsCard />
                </section>
            </main>
        </div>
    </div>
  );
}

export default ProfilePage