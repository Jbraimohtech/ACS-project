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
import LoadingBrand from "../components/LoadingBrand";
import { useNavigate } from "react-router-dom";
import MembershipAlert from "../memberShipComponents/MembershipAlert";

interface DashboardData {
  account_status: string;
  impact_points: number;
  total_donations: number;
  total_membership_fees: number;
  notifications_count: number;
  live_sessions: number;

  next_payment: {
    amount: string | number;
    due_date: string;
  };

  dues: {
    monthly_amount: string | number;
    months_since_join: number;
    months_paid: number;
    months_owing: number;
    due_amount: string | number;
    next_due_date: string | null;
    next_due_amount: string | number | null;
    is_owing: boolean;
    message: string;
  } | null;

  upcoming_events: {
    id: number;
    image: string;
    title: string;
    venue: string;
    date: string;
    description: string;
  }[];

  quick_resources: {
    title: string;
    url: string;
  }[];

  user: {
    name: string;
    email: string;
  };
}

const isGenericUserName = (value?: string | null) => {
  if (!value) {
    return true;
  }

  const normalized = value.trim().toLowerCase();

  return [
    "",
    "super admin",
    "admin",
    "administrator",
    "member",
    "user",
    "guest",
    "zone",
    "zones",
  ].some((candidate) => normalized === candidate || normalized.includes(candidate));
};

const getPreferredUserName = (fallbackUser: UserType | null, dashboardName?: string | null) => {
  const fallbackName = [fallbackUser?.first_name, fallbackUser?.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (fallbackName) {
    return fallbackName;
  }

  const candidate = dashboardName?.trim();

  if (candidate && !isGenericUserName(candidate)) {
    return candidate;
  }

  return "Member";
};

const normalizeDashboardData = (incoming: unknown, fallbackUser: UserType | null): DashboardData => {
  const payload = (incoming as { data?: unknown } | undefined)?.data ?? incoming;
  const source = (payload ?? {}) as Record<string, unknown>;
  const nextPayment = (source.last_payment ?? source.lastPayment ?? source.next_payment ?? source.nextPayment ?? {}) as Record<string, unknown>;
  const dues = (source.dues ?? {}) as Record<string, unknown>;
  const upcomingEvents = Array.isArray(source.upcoming_events)
    ? source.upcoming_events
    : Array.isArray(source.events)
      ? source.events
      : [];
  const quickResources = Array.isArray(source.quick_resources)
    ? source.quick_resources
    : Array.isArray(source.resources)
      ? source.resources
      : [];
  const userInfo = (source.user ?? source.member ?? source.profile ?? {}) as Record<string, unknown>;

  return {
    account_status: String(source.account_status ?? source.status ?? "active"),
    impact_points: Number(source.impact_points ?? 0),
    total_donations: Number(source.total_donations ?? 0),
    total_membership_fees: Number(source.total_membership_fees ?? 0),
    notifications_count: Number(source.notifications_count ?? 0),
    live_sessions: Number(source.live_sessions ?? source.liveSessions ?? 0),
    next_payment: {
      amount: String(dues.next_due_amount ?? dues.due_amount ?? nextPayment.amount ?? nextPayment.amount_due ?? 0),
      due_date: String(dues.next_due_date ?? nextPayment.due_date ?? nextPayment.paid_on ?? ""),
    },
    dues: {
      monthly_amount: String(dues.monthly_amount ?? "0"),
      months_since_join: Number(dues.months_since_join ?? 0),
      months_paid: Number(dues.months_paid ?? 0),
      months_owing: Number(dues.months_owing ?? 0),
      due_amount: String(dues.due_amount ?? 0),
      next_due_date: dues.next_due_date ? String(dues.next_due_date) : null,
      next_due_amount: dues.next_due_amount ? String(dues.next_due_amount) : null,
      is_owing: Boolean(dues.is_owing),
      message: String(dues.message ?? ""),
    },
    upcoming_events: (upcomingEvents as Array<Record<string, unknown>>).map((event, index) => ({
      id: Number(event.id ?? index),
      image: String(event.image ?? ""),
      title: String(event.title ?? "No title"),
      venue: String(event.venue ?? event.location ?? "TBA"),
      date: String(event.date ?? event.start_date ?? ""),
      description: String(event.description ?? ""),
    })),
    quick_resources: (quickResources as Array<Record<string, unknown>>).map((resource, index) => ({
      title: String(resource.title ?? resource.name ?? `Resource ${index + 1}`),
      url: resource.file
        ? `https://ambchapcorps.org/storage/${String(resource.file)}`
        : String(resource.url ?? resource.link ?? "#"),
    })),
    user: {
      name: getPreferredUserName(
        fallbackUser,
        String(userInfo.name ?? userInfo.full_name ?? userInfo.first_name ?? "") || null
      ),
      email: String(userInfo.email ?? source.email ?? fallbackUser?.email ?? ""),
    },
  };
};

const DashboardPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [isLoadingUser, setIsLoadingUser] = useState(() => !!getToken());
    const [user, setUser] = useState<UserType | null>(() => {
      const storedUser = getUser();
      if (!storedUser) return null;
      if (Array.isArray(storedUser)) {
        return storedUser.length > 0 ? (storedUser[0] as UserType) : null;
      }
      return storedUser as UserType;
    });
    const [dashboard, setDashboard] = useState<DashboardData | null>(null);
    const navigate = useNavigate();

    const goToDashboardEvents = () => {
      navigate("/event-content-page");
    } 

    const initials = user
      ? (user.first_name?.[0] || user.last_name?.[0] || user.email?.[0] || "?").toUpperCase()
      : "";
    const dashboardUserName = getPreferredUserName(user, dashboard?.user?.name);
    const dashboardUserEmail = user?.email || dashboard?.user?.email || "";
    const profileDisplayName = getPreferredUserName(user, dashboard?.user?.name);
    const accountStatus = dashboard?.account_status || "active";
    const nextPaymentAmount = Number(dashboard?.next_payment?.amount ?? 0);
    const nextPaymentDueDate = dashboard?.next_payment?.due_date;
    const paymentMessage = dashboard?.dues?.message || (dashboard?.dues?.is_owing ? "Payment is due." : "No pending dues.");
    const upcomingEvents = dashboard?.upcoming_events ?? [];
    const quickResources = dashboard?.quick_resources ?? [];

    const getDaysUntilDue = (dateValue?: string | null) => {
      if (!dateValue) {
        return null;
      }

      const dueDate = new Date(dateValue);
      if (Number.isNaN(dueDate.getTime())) {
        return null;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      dueDate.setHours(0, 0, 0, 0);

      return Math.ceil((dueDate.getTime() - today.getTime()) / 86400000);
    };

    const daysUntilDue = getDaysUntilDue(nextPaymentDueDate || dashboard?.dues?.next_due_date);
    const isMembershipPending = Boolean(
      dashboard &&
      (!['approved', 'active', 'paid', 'complete'].includes(accountStatus.toLowerCase()) ||
        dashboard.dues?.is_owing)
    );
    const showMembershipAlert = Boolean(
      dashboard &&
      (isMembershipPending || (daysUntilDue !== null && daysUntilDue <= 7))
    );
    const membershipAlertMessage = dashboard?.dues?.message ||
      (isMembershipPending
        ? "Complete your membership payment to stay active."
        : "Your membership payment is due soon. Pay now to avoid interruption.");

    useEffect(() => {
      const token = getToken();
      if (!token) {
        return;
      }

      let isActive = true;
      const controller = new AbortController();

      const fetchDashboardData = async () => {
        try {
          setIsLoadingUser(true);

          const [userResponse, dashboardResponse] = await Promise.allSettled([
            fetch("https://ambchapcorps.org/api/user", {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
              signal: controller.signal,
            }),
            fetch("https://ambchapcorps.org/api/dashboard", {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
              signal: controller.signal,
            }),
          ]);

          let resolvedUser = user;

          if (userResponse.status === "fulfilled" && userResponse.value.ok) {
            const data = await userResponse.value.json();
            let apiUser: unknown = data.user ?? data.data ?? data;

            if (Array.isArray(apiUser)) {
              apiUser = apiUser.length > 0 ? apiUser[0] : null;
            }

            if (apiUser && typeof apiUser === "object") {
              const parsedUser = apiUser as UserType;
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

              if (!isDefaultUser) {
                resolvedUser = parsedUser;
                if (isActive) {
                  setUser(parsedUser);
                  persistUser(parsedUser);
                }
              }
            }
          }

          if (dashboardResponse.status === "fulfilled" && dashboardResponse.value.ok) {
            const result = await dashboardResponse.value.json();

            if (isActive && result && typeof result === "object") {
              setDashboard(normalizeDashboardData(result, resolvedUser));
            }
          }
        } catch (error) {
          console.error(error);
        } finally {
          if (isActive) {
            setIsLoadingUser(false);
          }
        }
      };

      fetchDashboardData();

      return () => {
        isActive = false;
        controller.abort();
      };
    }, [user]);

  if (isLoadingUser && !user) {
    return (
      <div className="zenProfileLayout">
        <DashboardSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="orionMainContent">
          <LoadingBrand />
        </div>
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
                            {profileDisplayName}
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

                <div className="notify-icon-profile"></div>
                
                <div className="notify-icon-profile-box">
                    
                </div>
                <div className="notify-icon-profile-box">
                    <div className="profile-image-small"></div>
                </div>
            </div>
        </div>

        {/* end of mobile header */}
        <MembershipAlert
          show={showMembershipAlert}
          message={membershipAlertMessage}
          notificationCount={dashboard?.notifications_count ?? 0}
        />
        
    <div className="dashboardHeader-spacing">

      {/* Header */}
      <div className="dashboardHeader">
        <div>
         <h1>
          Welcome back, <span>{dashboardUserName}</span>!
        </h1>
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
            {accountStatus.toUpperCase()}
          </h3>

          <p>Account Status</p>

          <span>
            ● {accountStatus}
          </span>
        </div>

        <div className="statCard">
          <CreditCard size={18} />
          <h3>
            ₦{nextPaymentAmount.toLocaleString()}
            </h3>

            <p>Next Payment</p>

            <span>
              {nextPaymentDueDate
                ? `Due ${new Date(nextPaymentDueDate).toLocaleDateString()}`
                : paymentMessage}
            </span>
        </div>

        <div className="statCard">
          <Calendar size={18} />
          <h3>
            {upcomingEvents.length}
          </h3>
          <p>Upcoming Events</p>
          <span>Upcoming Events</span>
        </div>

        <div className="statCard">
          <MessageCircle size={18} />
          <h3>
            {dashboard?.notifications_count ?? 0}
          </h3>
          <p>Notifications</p>
          <span>Unread Notifications</span>
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

            {upcomingEvents.map((event) => (
              <div
                className="eventCard"
                key={event.id}
              >
                <div>
                  <small>
                    {new Date(event.date).toLocaleDateString()}
                  </small>

                  <h4>{event.title}</h4>

                  <p>{event.venue}</p>
                </div>

                <button onClick={goToDashboardEvents} className="viewButtonToEvent">
                  View
                </button>
              </div>
            ))}
          </section>

          {/* Announcements */}
          {/* <section className="dashboardSection">
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
          </section> */}

        </div>

        <div>

          {/* Attendance */}
          {/* <section className="dashboardSection">
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
          </section> */}

          {/* Resources */}
          <section className="dashboardSection">
            <div className="sectionHeader">
              <h2>Quick Resources</h2>
            </div>

            {quickResources.map(
              (resource, index) => (
                <div
                  className="listItem"
                  key={index}
                >
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {resource.title}
                  </a>
                </div>
              )
            )}
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
              {profileDisplayName}
            </h3>

            <p>
              {dashboardUserEmail}
            </p>

            <button onClick={() => navigate("/profile-page")} className="viewProfileButton">
              View Profile
            </button>
          </div>

          <div className="quickActions">
            <h4>Quick Action</h4>

            <button onClick={() => navigate("/billing-payment-page")}>
              View Billing History
            </button>
            <button onClick={() => navigate("/profile-page")}>
              Profile Settings
            </button>
            <button onClick={() => navigate("/profile-security-page")}>
              Security Settings
            </button>
          </div>

        </div>
        </div>

      </div>
      </div>

    </div>
  );
};

export default DashboardPage;