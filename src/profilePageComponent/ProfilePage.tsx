
import AccountInfoCard from "./AccountInfoCard";
import DashboardSidebar from "./DashboardSidebar";
import PersonalInfoCard from "./PersonalInfoCard";
import ProfileBanner from "./ProfileBanner";
import "./ProfilePage.css"
import QuickActionsCard from "./QuickActionsCard";
import { useState, useEffect } from "react";
import { getToken, getUser } from "../utils/auth";
import {
  Bell,
  ChevronDown,
  Search,
  Menu,
} from "lucide-react";
import type { User } from "../types/User";


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

      console.log(data);

      if (data.user && data.user.length > 0) {
        const apiUser = data.user[0] as User;
        
        // Validate that this is not a default/demo user
        const firstName = apiUser.first_name?.toLowerCase() || "";
        const lastName = apiUser.last_name?.toLowerCase() || "";
        const email = apiUser.email?.toLowerCase() || "";
        
        const isDefaultUser =
          firstName === "super" ||
          lastName === "super" ||
          email === "super@example.com" ||
          firstName === "admin" ||
          lastName === "admin" ||
          email === "admin@example.com";

        if (!isDefaultUser) {
          setUser(apiUser);
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

                    <div className="notify-icon-profile"></div>
                    <div className="notify-icon-profile-box">
                        {/* <div className="profile-image-small">

                        </div> */}
                        <img
                            src={
                                user?.profile_image
                                ? `https://ambchapcorps.org/storage/${user.profile_image}`
                                : "/profile.jpg"
                            }
                            alt="Profile"
                            className="profile-image-small"
                            onError={(e) => {
                                e.currentTarget.src = "/profile.jpg";
                            }}
                            />
                        
                    </div>
                </div>
            </div>

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