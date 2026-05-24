import "./AboutUs.css"


const AboutContent = () => {
  return (
    <div>
        {/* MAIN CONTENT */}
      <section className="about-us-content">
        {/* LEFT PROFILE CARD */}
        <div className="profile-card">
          <div className="profile-image-wrapper">
            <div className="about-us-image">
                <div className="profile-badge">
                    <h4>Andrea Luises</h4>
                    <p>Regional Manager</p>
                </div>
            </div>
          </div>

          <p className="profile-description">
            A dedicated member actively contributing to operational
            coordination and community development within the system.
          </p>

          <div className="info-group">
            <h4>Phone Number:</h4>
            <p>+ (123) 1800-567-8990</p>
          </div>

            <div className="info-flow-container">
                <div className="info-row">
                    <div>
                    <h4>Role</h4>
                    <p>Unit Coordinator</p>
                    </div>

                    <div>
                    <h4>Region</h4>
                    <p>Lagos Island</p>
                    </div>
                </div>

                <div className="info-row">
                    <div>
                    <h4>Unit:</h4>
                    <p>Operations Unit</p>
                    </div>
                    

                    <div>
                    <h4>Status:</h4>
                    <p className="status">
                        <span className="status-dot"></span>
                        Active Member
                    </p>
                </div>
            </div>
          </div>
        </div>

        {/* RIGHT DETAILS */}
        <div className="details-card">
          <p className="details-text">
            Daniel actively contributes to operational coordination and
            maintains consistent participation across system activities.
          </p>

          {/* STATS */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="bar-chart"></div>
              <h3>18+</h3>
              <p>Events Participated</p>
            </div>

            <div className="stat-card">
              <div className="calendar-days"></div>
              <h3>
                High <span className="green-dot"></span>
              </h3>
              <p>Engagement level</p>
            </div>

            <div className="stat-card">
              <div className="about-us-clock"></div>
              <h3>2 days ago</h3>
              <p>Last Activity</p>
            </div>
          </div>

          {/* RESPONSIBILITY */}
          <div className="responsibility">
            <h2>Responsibility Scope</h2>

            <p>
              Coordinates unit activities, oversees participation,
              and ensures operational alignment within assigned group.
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}

export default AboutContent