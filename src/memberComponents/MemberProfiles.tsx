import React from "react";
import { useNavigate } from "react-router-dom";
import "./Member.css";
import type { Member } from "../types/member";
import { getProfileImageUrl, getUser } from "../utils/auth";
import type { User as UserType } from "../types/User";
import fallbackProfileImage from "../assets/images/imageProfile-demo.jpeg";

interface MemberProfilesProps {
  members: Member[];
}

const MemberProfiles: React.FC<MemberProfilesProps> = ({ members }) => {

const navigate = useNavigate();
const currentUser = getUser() as UserType | null;
const currentMembershipId = currentUser?.membership_id?.toString() ?? null;

const goToProfileAbout = (memberId: number) => {
  navigate(`/member/${memberId}`)
}

const goToRankingPage = () => {
  navigate("/ranking-structure")
}

const goToLeaderboard = () => {
  navigate("/leaders")
}

const goToMembersPage = () => {
  navigate("/members")
}


  return (
    <div className='member-profiles-box'>
        {/* TABS */}
      <div className="tabs">

        <button className="active" onClick={goToMembersPage}>
          Past Members
        </button>

        <button onClick={goToLeaderboard}>
          Present Officers and Excos
        </button>

        <button onClick={goToRankingPage}>
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

          {members.map((member) => {
            const memberMembershipId = member.membership_id?.toString() ?? null;
            const matchedProfileImage =
              memberMembershipId &&
              currentMembershipId &&
              memberMembershipId === currentMembershipId
                ? currentUser?.profile_image || member.profile_image
                : member.profile_image;

            const profileImageSrc = matchedProfileImage
              ? getProfileImageUrl(matchedProfileImage)
              : fallbackProfileImage;

            return (
              <div
                className="member-card"
                key={member.id}
              >
                <img
                  src={profileImageSrc}
                  alt={member.first_name}
                  onError={(e) => {
                    e.currentTarget.src = fallbackProfileImage;
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
            );
          })}

        </div>

      </section>

    </div>
  )
}

export default MemberProfiles