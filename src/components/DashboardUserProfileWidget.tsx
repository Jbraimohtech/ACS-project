import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getProfileImageUrl, getToken, getUser, normalizeUserPayload, extractDashboardUser, setUser as persistUser } from "../utils/auth";
import { API_BASE } from "../utils/api";
import type { User as UserType } from "../types/User";
import { useNavigate } from "react-router-dom";

const DashboardUserProfileWidget = () => {

  const navigate = useNavigate();
  
  const [user, setUser] = useState<UserType | null>(() => {
    const storedUser = getUser();
    if (!storedUser) return null;
    if (Array.isArray(storedUser)) {
      return storedUser.length > 0 ? (storedUser[0] as UserType) : null;
    }
    return storedUser as UserType;
  });

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    let isActive = true;

    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_BASE}/dashboard`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) return;

        const data = await response.json();
        const apiUser = extractDashboardUser(data);
        const normalizedUser = normalizeUserPayload(apiUser);

        if (normalizedUser && typeof normalizedUser === "object") {
          const parsedUser = normalizedUser as unknown as UserType;
          const firstName = (parsedUser.first_name ?? "").toLowerCase();
          const lastName = (parsedUser.last_name ?? "").toLowerCase();
          const email = (parsedUser.email ?? "").toLowerCase();

          const isDefaultUser =
            firstName === "super" ||
            lastName === "super" ||
            email === "super@example.com" ||
            firstName === "admin" ||
            lastName === "admin" ||
            email === "admin@example.com";

          if (!isDefaultUser && isActive) {
            setUser(parsedUser);
            persistUser(parsedUser);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();

    return () => {
      isActive = false;
    };
  }, []);

  const initials = useMemo(() => {
    if (!user) return "?";
    return (user.first_name?.[0] || user.last_name?.[0] || user.email?.[0] || "?").toUpperCase();
  }, [user]);

  const firstName = user?.first_name?.trim();
  const lastName = user?.last_name?.trim();
  const fullName = firstName || lastName
    ? firstName && lastName
      ? `${lastName} ${firstName}`
      : [firstName, lastName].filter(Boolean).join(" ").trim()
    : ((user as UserType & { name?: string | null; full_name?: string | null })?.name ||
        (user as UserType & { name?: string | null; full_name?: string | null })?.full_name ||
        "Member");

  return (
    <div className="orionUserProfileWidget" onClick={() => navigate("/profile-page")}>
      {user?.profile_image ? (
        <img
          src={getProfileImageUrl(user.profile_image)}
          alt="User"
          className="orionUserAvatar"
          onError={(e) => {
            e.currentTarget.src = "/profile.jpg";
          }}
        />
      ) : (
        <div className="orionUserAvatarInitials">{initials}</div>
      )}

      <div className="orionUserMeta">
        <h4>{fullName}</h4>
        <span>
          {user?.membership_id ? `ID: ${user.membership_id}` : user?.id ? `User #${user.id}` : "Loading profile..."}
        </span>
      </div>

      <ChevronDown size={16} />
    </div>
  );
};

export default DashboardUserProfileWidget;
