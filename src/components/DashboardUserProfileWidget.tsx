import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getToken, getUser, setUser as persistUser } from "../utils/auth";
import type { User as UserType } from "../types/User";

const DashboardUserProfileWidget = () => {
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
        const response = await fetch("https://ambchapcorps.org/api/user", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) return;

        const data = await response.json();
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

  const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(" ").trim() || "Member";

  return (
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
