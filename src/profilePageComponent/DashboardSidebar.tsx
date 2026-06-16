import "./ProfilePage.css";
import { X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}


const DashboardSidebar = ({
  sidebarOpen,
  setSidebarOpen,
}: DashboardSidebarProps) => {
  const navigate = useNavigate();

  const goToProfilePage = () => {
    navigate("/profile-page");
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="zenSidebarOverlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`zenDashboardSidebar ${
          sidebarOpen ? "zenSidebarActive" : ""
        }`}
      >
        <button
          className="zenSidebarClose"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={22} />
        </button>

        <aside className="quantumSidebarShell">
          <h2 className="quantumLogoText">ACS</h2>

          <nav className="quantumSidebarNav">

            <NavLink
              to="/dashboard-page"
              className={({ isActive }) =>
                `quantumSidebarNav-btn ${isActive ? "quantumSidebarNav-btn-active" : ""}`
              }
            >
              <div className="dashboard-icon"></div>
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/billing-payment-page"
              className={({ isActive }) =>
                `quantumSidebarNav-btn ${isActive ? "quantumSidebarNav-btn-active" : ""}`
              }
            >
              <div className="payments-icon"></div>
              <span>Payments</span>
            </NavLink>

            <NavLink
              to="/event-content-page"
              className={({ isActive }) =>
                `quantumSidebarNav-btn ${isActive ? "quantumSidebarNav-btn-active" : ""}`
              }
            >
              <div className="events-icon"></div>
              <span>Events</span>
            </NavLink>

            <NavLink
              to="/news-page"
              className={({ isActive }) =>
                `quantumSidebarNav-btn ${isActive ? "quantumSidebarNav-btn-active" : ""}`
              }
            >
              <div className="news-icon"></div>
              <span>News</span>
            </NavLink>

            <NavLink
              to="/resource"
              className={({ isActive }) =>
                `quantumSidebarNav-btn ${isActive ? "quantumSidebarNav-btn-active" : ""}`
              }
            >
              <div className="resources-icon"></div>
              <span>Resources</span>
            </NavLink>

          </nav>

          <div className="quantumSidebarBottom">
            <NavLink
              to="/profile-page"
              className={({ isActive }) =>
                `quantumProfileBtn ${isActive ? "quantumProfileBtn-active" : ""}`
              }
              onClick={goToProfilePage}
            >
              <div className="my-profile-icon"></div>
              <span>My Profile</span>
            </NavLink>

            <button className="quantumLogoutBtn">
              <div className="log-out-icon"></div>
              <span>Log out</span>
            </button>
          </div>
        </aside>
      </aside>
    </>
  );
};

export default DashboardSidebar;