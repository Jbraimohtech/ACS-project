import "./ProfilePage.css"

const DashboardSidebar = () => {
  return (
    <aside className="quantumSidebarShell">
      <h2 className="quantumLogoText">ACS</h2>

      <nav className="quantumSidebarNav">
        <button className="quantumSidebarNav-btn">
            <div className="dashboard-icon"></div>
            <span>Dashboard</span>
        </button>
        <button className="quantumSidebarNav-btn">
            <div className="payments-icon"></div>
            <span>Payments</span>
        </button>
        <button className="quantumSidebarNav-btn">
            <div className="events-icon"></div>
            <span>Events</span>
        </button>
        <button className="quantumSidebarNav-btn">
            <div className="news-icon"></div>
            <span>News</span>
        </button>
        <button className="quantumSidebarNav-btn">
            <div className="resources-icon"></div>
            <span>Resources</span>
        </button>
      </nav>

      <div className="quantumSidebarBottom">
        <button className="quantumProfileBtn">
          <div className="my-profile-icon"></div>
            <span>My Profile</span>
        </button>

        <button className="quantumLogoutBtn">
          <div className="log-out-icon"></div>
            <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}

export default DashboardSidebar