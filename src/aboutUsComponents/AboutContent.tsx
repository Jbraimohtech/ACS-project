import "./AboutUs.css"
import type { Member } from "../types/member"

interface Props {
  member: Member;
}

const AboutContent = ({
  member,
}: Props) => {

  const hasProfileImage = Boolean(member.profile_image);
  const imageUrl = hasProfileImage
    ? `https://ambchapcorps.org/storage/${member.profile_image}`
    : "";

  return (
    <div>
        {/* MAIN CONTENT */}
      <section className="about-us-content">
        {/* LEFT PROFILE CARD */}
        <div className="profile-card">
          <div className="profile-image-wrapper">
            <div
              className="about-us-image"
              style={hasProfileImage ? { backgroundImage: `url(${imageUrl})` } : undefined}
            >
                <div className="profile-badge">
                    <h4>
                      {member.first_name}{" "}
                      {member.last_name ?? ""}
                    </h4>
                    
                    <p>{member.status || "N/A"}</p>
                    {/* <p>{member.position || "N/A"}</p> */}
                </div>
            </div>
          </div>

          <p className="profile-description">
            Member ID: {member.membership_id}
          </p>

          <div className="info-group">
            <h4>Phone Number:</h4>
            <p>{member.phone}</p>
          </div>

          <div className="info-group">
            <h4>Email:</h4>
            <p>{member.email}</p>
          </div>

          <div className="info-group">
            <h4>Status:</h4>
            <p>{member.status}</p>
          </div>

          <div className="info-group">
            <h4>Gender:</h4>
            <p>{member.gender || "N/A"}</p>
          </div>
        </div>

        {/* RIGHT DETAILS */}
        <div className="details-card">
          <p className="details-text">
            {member.first_name} actively contributes to operational coordination and
            maintains consistent participation across system activities.
          </p>

          {/* STATS */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="bar-chart"></div>
              <h3>Member</h3>
              <p>Since {member.membership_start_date ? new Date(member.membership_start_date).getFullYear() : "N/A"}</p>
            </div>

            <div className="stat-card">
              <div className="calendar-days"></div>
              <h3>
                Active <span className="green-dot"></span>
              </h3>
              <p>Engagement level</p>
            </div>

            <div className="stat-card">
              <div className="about-us-clock"></div>
              <h3>Zone {member.zone_id}</h3>
              <p>Assignment</p>
            </div>
          </div>

          {/* RESPONSIBILITY */}
          <div className="responsibility">
            <h2>Member Details</h2>

            <p>
              {member.first_name} {member.last_name} is an active member of our organization with 
              excellent participation records and commitment to our mission.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default AboutContent;