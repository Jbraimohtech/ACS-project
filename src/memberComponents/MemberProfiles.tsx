import { useNavigate } from "react-router-dom";
import "./Member.css";
import { useEffect, useState } from "react";

interface Member {
  id: number;
  first_name: string;
  last_name: string | null;
  profile_image: string | null;
  membership_id: string;
  status: string;
}

const MemberProfiles = () => {
  const [members, setMembers] = useState<Member[]>([]);
const [loading, setLoading] = useState(true);

const navigate = useNavigate();

const goToProfileAbout = () => {
  navigate("/about-us")
}

useEffect(() => {
  const fetchMembers = async () => {
    try {
      const response = await fetch(
        "https://ambchapcorps.org/api/members"
      );

      const result = await response.json();

      setMembers(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchMembers();
}, []);

if (loading) {
  return (
    <div className="membersLoading">
      Loading members...
    </div>
  );
}
  return (
    <div className='member-profiles-box'>
        {/* TABS */}
      <div className="tabs">

        <button className="active">
          Past Members
        </button>

        <button>
          Present Officers and Excos
        </button>

        <button>
          ACC Ranking
        </button>

      </div>

      {/* MEMBERS */}
      <section className="members-section">

        <h1 className="section-title">
          PAST OFFICERS
        </h1>

        <p className="section-subtitle">
          A. THE PROMOTERS AND/OR SUBSCRIBERS
          TO THE MEMO AND ARTICLES OF ASSOCIATION ARE:
        </p>

        {/* GRID */}
        <div className="members-grid">

          {members.map((member) => (
            <div
              className="member-card"
              key={member.id}
            >
              <img
                src={
                  member.profile_image
                    ? `https://ambchapcorps.org/storage/${member.profile_image}`
                    : "/images/default-avatar.jpg"
                }
                alt={member.first_name}
                onError={(e) => {
                  e.currentTarget.src =
                    "/images/default-avatar.jpg";
                }}
              />

              <div className="member-content">
                <h3>
                  {member.first_name}
                  {member.last_name
                    ? ` ${member.last_name}`
                    : ""}
                </h3>

                <p>{member.membership_id}</p>

                <span>
                  {member.status}
                </span>

                <button onClick={goToProfileAbout}>
                  View Profile
                </button>
              </div>
            </div>
          ))}

        </div>

      </section>

    </div>
  )
}

export default MemberProfiles