import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import AllMainContent from "../components/AllMainContent";
import SearchBox from "../components/SearchBox";
import "../EventsComponents/Event.css";
import "./Member.css";
import HomeFooter from "../components/HomeFooter";
import { FaChevronDown } from "react-icons/fa";
import Navbar from "../components/Navbar/Navbar";
import LoadingBrand from "../components/LoadingBrand";
import type { Member } from "../types/member";
import { getProfileImageUrl, getUser } from "../utils/auth";
import type { User as UserType } from "../types/User";
import fallbackProfileImage from "../assets/images/imageProfile-demo.jpeg";
import { Helmet } from "react-helmet";

const MemberSearch = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentUser = getUser() as UserType | null;
  const currentMembershipId = currentUser?.membership_id?.toString() ?? null;

const queryParam = searchParams.get("query") || "";
const [query, setQuery] = useState(() => queryParam);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);

  // Derive this instead of storing it in state
  const hasSearched = query.trim().length > 0;

  const goToProfileAbout = (memberId: number) => {
    navigate(`/member/${memberId}`);
  };

  // Keep query synced with URL param
  useEffect(() => {
    if (!hasSearched) {
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://ambchapcorps.org/api/members/search?query=${encodeURIComponent(
            query
          )}`
        );

        const data = await response.json();

        console.log(data);

        setMembers((data.data ?? []) as Member[]);
      } catch (error) {
        console.error("Search error:", error);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, hasSearched]);

  return (
    <div>
      <Helmet>
        <title>Member Search - Ambassadors Chaplain Corps</title>
        <meta name="description" content="Search for members within the Ambassadors Chaplain Corps." />
        <meta name="keywords" content="member search, ambassadors, chaplain, corps" />
      </Helmet>
      <AllMainContent>
        <Navbar />

        <div className="member-head-text">
          <h1>Search Members</h1>
        </div>

        <SearchBox>
          <div className="search-filter-box">
            <p>Filter</p>

            <button type="button">
              <FaChevronDown />
            </button>
          </div>

          <input
            type="text"
            placeholder="Search for members"
            name="query"
            value={query}
            onChange={(e) => {
              const value = e.target.value;

              setQuery(value);

              // Clear results immediately when input is empty
              if (!value.trim()) {
                setMembers([]);
              }
            }}
          />

          <button
            type="submit"
            className="search-icon-button-box"
            aria-label="Search"
          >
            <div className="search-icon"></div>
          </button>
        </SearchBox>
      </AllMainContent>

      <section className="member-search-results">
        {hasSearched && loading && <LoadingBrand />}

        {hasSearched && !loading && members.length === 0 && (
          <p>No members found for "{query}"</p>
        )}

        {!hasSearched && <p>Enter a search to find members</p>}

        {hasSearched && !loading && members.length > 0 && (
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
                <div className="member-card" key={member.id}>
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
                      {member.last_name ? ` ${member.last_name}` : ""}
                    </h3>

                    <p>{member.membership_id}</p>

                    <span>{member.status}</span>

                    <button
                      onClick={() => goToProfileAbout(member.id)}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <HomeFooter />
    </div>
  );
};

export default MemberSearch;