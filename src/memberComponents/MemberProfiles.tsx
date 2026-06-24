import React from "react";
import { useNavigate } from "react-router-dom";
import "./Member.css";
import type { Member } from "../types/member";

interface MemberProfilesProps {
  members: Member[];
}

const MemberProfiles: React.FC<MemberProfilesProps> = ({ members }) => {

const navigate = useNavigate();

const goToProfileAbout = (memberId: number) => {
  navigate(`/member/${memberId}`)
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

                <button onClick={() => goToProfileAbout(member.id)}>
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