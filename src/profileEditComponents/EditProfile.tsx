import { ArrowLeft, User } from "lucide-react";
import "./EditProfile.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken, getUser, setUser as persistUser } from "../utils/auth";

interface UserProfile {
  id: number;
  first_name: string;
  last_name: string | null;
  profile_image: string | null;
  gender: string | null;
  email: string;
  phone: string | null;
  membership_id: string | null;
  status: string;
  payment_status: number;
  zone_id: number | null;
}

const normalizeUser = (payload: unknown, authenticatedEmail?: string | null): UserProfile | null => {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const source = payload as Record<string, unknown>;
  const nestedUser = source.user;

  const candidates: Array<Partial<UserProfile>> = [];

  if (Array.isArray(nestedUser)) {
    candidates.push(...nestedUser.filter((item): item is Partial<UserProfile> => !!item && typeof item === "object") as Partial<UserProfile>[]);
  } else if (nestedUser && typeof nestedUser === "object") {
    candidates.push(nestedUser as Partial<UserProfile>);
  }

  if (candidates.length === 0) {
    candidates.push(source as Partial<UserProfile>);
  }

  const target = candidates.find((candidate) => {
    if (!candidate || typeof candidate !== "object") {
      return false;
    }

    const candidateEmail = String(candidate.email ?? "").trim().toLowerCase();
    const normalizedAuthenticatedEmail = authenticatedEmail?.trim().toLowerCase();

    if (normalizedAuthenticatedEmail) {
      return candidateEmail === normalizedAuthenticatedEmail;
    }

    return true;
  }) ?? candidates[0];

  if (!target || typeof target !== "object") {
    return null;
  }

  return {
    id: Number(target.id ?? 0),
    first_name: String(target.first_name ?? ""),
    last_name: target.last_name ? String(target.last_name) : null,
    profile_image: target.profile_image ? String(target.profile_image) : null,
    gender: target.gender ? String(target.gender) : null,
    email: String(target.email ?? ""),
    phone: target.phone ? String(target.phone) : null,
    membership_id: target.membership_id ? String(target.membership_id) : null,
    status: String(target.status ?? "Active"),
    payment_status: Number(target.payment_status ?? 0),
    zone_id: target.zone_id ? Number(target.zone_id) : null,
  };
};

const EditProfile = () => {
  const navigate = useNavigate();

  const storedUser = getUser();
  const normalizedStoredUser = Array.isArray(storedUser)
    ? (storedUser[0] as UserProfile | null)
    : (storedUser as UserProfile | null);

  const [loading, setLoading] = useState(!normalizedStoredUser);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [user, setUserState] = useState<UserProfile | null>(normalizedStoredUser);

  const [formData, setFormData] = useState({
    first_name: normalizedStoredUser?.first_name || "",
    last_name: normalizedStoredUser?.last_name || "",
    email: normalizedStoredUser?.email || "",
    phone: normalizedStoredUser?.phone || "",
  });

  const setUserData = (value: UserProfile | null) => {
    setUserState(value);
    if (value) {
      persistUser(value);
    }
  };

  const hydrateForm = (value: UserProfile | null) => {
    console.log("HYDRATE FORM", value);

    setFormData({
      first_name: value?.first_name || "",
      last_name: value?.last_name || "",
      email: value?.email || "",
      phone: value?.phone || "",
    });
  };

  const goToProfilePage = () => {
    navigate("/profile-page");
  };

  const goToProfileSecurity = () => {
    navigate("/profile-security-page");
  };

  const handleProfileImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploadingImage(true);
      setMessage("");
      setError("");

      const token = getToken();
      if (!token) {
        throw new Error("You need to be logged in to upload your profile image.");
      }

      const formData = new FormData();
      formData.append("profile_image", file);
      formData.append("_method", "PUT");

      const uploadAttempts = [
        {
          url: "https://ambchapcorps.org/api/user/profile-image",
          method: "POST" as const,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
        {
          url: "https://ambchapcorps.org/api/profile/image",
          method: "POST" as const,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      ];

      let lastError = "Failed to upload profile image";
      let result: Record<string, unknown> = {};

      for (const attempt of uploadAttempts) {
        try {
          const response = await fetch(attempt.url, {
            method: attempt.method,
            headers: attempt.headers,
            body: attempt.body,
          });

          const parsed = await response.json().catch(() => ({}));

          if (response.ok) {
            result = parsed as Record<string, unknown>;
            break;
          }

          lastError = (parsed?.message as string) || (parsed?.error as string) || lastError;
        } catch (error) {
          lastError = error instanceof Error ? error.message : lastError;
        }
      }

      if (!result || Object.keys(result).length === 0) {
        throw new Error(lastError);
      }

      const responsePayload = (result ?? {}) as Record<string, unknown>;
      const nestedResponse = responsePayload.data as Record<string, unknown> | undefined;
      const updatedImage = String(
        responsePayload.profile_image ?? nestedResponse?.profile_image ?? ""
      );
      const nextUser = user
        ? { ...user, profile_image: updatedImage || user.profile_image }
        : normalizedStoredUser
          ? { ...normalizedStoredUser, profile_image: updatedImage || normalizedStoredUser.profile_image }
          : null;

      if (nextUser) {
        setUserData(nextUser);
      }

      setMessage((result?.message as string) || "Profile picture updated successfully");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong while uploading your profile picture");
      }
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken();

        if (!token) {
          if (normalizedStoredUser) {
            setUserData(normalizedStoredUser);
            hydrateForm(normalizedStoredUser);
          }
          setLoading(false);
          return;
        }

        const response = await fetch("https://ambchapcorps.org/api/user", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Unable to load profile");
        }

        const data = await response.json().catch(() => ({}));
        const authenticatedEmail = normalizedStoredUser?.email || getUser()?.email || null;
        const profile = normalizeUser(data, authenticatedEmail);

        if (profile) {
          setUserData(profile);

          setFormData((current) => {
              if (
                  current.first_name ||
                  current.last_name ||
                  current.email ||
                  current.phone
              ) {
                  return current;
              }

              return {
                  first_name: profile.first_name || "",
                  last_name: profile.last_name || "",
                  email: profile.email || "",
                  phone: profile.phone || "",
              };
          });
      } else if (normalizedStoredUser) {
          setUserData(normalizedStoredUser);
          hydrateForm(normalizedStoredUser);
        }
      } catch (error) {
        console.error("Failed to load profile:", error);

        if (normalizedStoredUser) {
          setUserData(normalizedStoredUser);
          hydrateForm(normalizedStoredUser);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [normalizedStoredUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const token = getToken();

      if (!token) {
        throw new Error("You need to be logged in to update your profile.");
      }

      const payload = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        name: `${formData.first_name.trim()} ${formData.last_name.trim()}`.trim(),
      };

      const attempts = [
        {
          url: "https://ambchapcorps.org/api/user",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
        {
          url: "https://ambchapcorps.org/api/dashboard/updateProfile",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
        {
          url: "https://ambchapcorps.org/api/dashboard/updateProfile",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      ];

      let result: Record<string, unknown> = {};
      let lastError = "Failed to update profile";

      for (const attempt of attempts) {
        try {
          const response = await fetch(attempt.url, attempt);
          const parsed = await response.json().catch(() => ({}));

          if (response.ok) {
            result = parsed as Record<string, unknown>;
            break;
          }

          lastError = (parsed?.message as string) || (parsed?.error as string) || lastError;
        } catch (error) {
          lastError = error instanceof Error ? error.message : lastError;
        }
      }

      if (!result || Object.keys(result).length === 0) {
        throw new Error(lastError);
      }

      const updatedUser = normalizeUser(
          result?.user ?? result?.data ?? result,
          normalizedStoredUser?.email
      );

      const mergedUser: UserProfile = {
        id: user?.id ?? normalizedStoredUser?.id ?? 0,
        first_name: payload.first_name || user?.first_name || normalizedStoredUser?.first_name || "",
        last_name: payload.last_name || user?.last_name || normalizedStoredUser?.last_name || null,
        profile_image: user?.profile_image || normalizedStoredUser?.profile_image || null,
        gender: user?.gender || normalizedStoredUser?.gender || null,
        email: payload.email || user?.email || normalizedStoredUser?.email || "",
        phone: payload.phone || user?.phone || normalizedStoredUser?.phone || null,
        membership_id: user?.membership_id || normalizedStoredUser?.membership_id || null,
        status: user?.status || normalizedStoredUser?.status || "Active",
        payment_status: user?.payment_status || normalizedStoredUser?.payment_status || 0,
        zone_id: user?.zone_id || normalizedStoredUser?.zone_id || null,
      };

      if (updatedUser) {
        setUserData(updatedUser);
        hydrateForm(updatedUser);
      } else {
        setUserData(mergedUser);
        hydrateForm(mergedUser);
      }

      setMessage((result?.message as string) || "Profile updated successfully");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setSaving(false);
    }
  };
  if (loading && !user) {
    return (
      <div className="cosmosEditProfileWrapper">
        <div className="cosmosEditProfileHeader">
          <h1 className="cosmosPageTitle">Edit Profile</h1>
          <p className="cosmosPageSubtitle">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cosmosEditProfileWrapper">
      {/* Header */}
      <div className="cosmosEditProfileHeader">
        <div className="cosmosBackRow">
          <ArrowLeft
            size={18}
            onClick={goToProfilePage}
          />
          <span>Edit Profile</span>
        </div>

        <h1 className="cosmosPageTitle">
          Edit Profile
        </h1>

        <p className="cosmosPageSubtitle">
          Manage your public identity and
          account settings
        </p>
      </div>

      {/* Content */}
      <div className="cosmosEditProfileGrid">
        {/* LEFT PANEL */}
        <div className="orbitProfilePanel">
          <div className="orbitUserCard">
            <img
              src={
                user?.profile_image
                  ? `https://ambchapcorps.org/storage/${user.profile_image}`
                  : "/profile.jpg"
              }
              alt={user?.first_name || "Profile"}
              className="orbitProfilePhoto"
            />

            <h3 className="orbitMemberName">
              {user?.first_name || "Member"}{" "}
              {user?.last_name ?? ""}
            </h3>

            <p className="orbitMemberRole">
              Member
            </p>

            <label className="orbitPhotoLink" style={{ cursor: "pointer", display: "inline-block" }}>
              {uploadingImage ? "Uploading..." : "Change Profile Picture"}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                style={{ display: "none" }}
              />
            </label>
          </div>

          <div className="nebulaStatusCard">
            <p className="nebulaStatusTitle">
              Profile Status
            </p>

            <div className="nebulaStatusRow">
              <span className="nebulaGreenDot" />

              <span className="nebulaStatusText">
                {user?.status || "Active"}
              </span>
            </div>

            <p className="nebulaStatusDescription">
              Your profile is visible to
              other members.
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="quantumFormCard">

          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
          >
            <div className="quantumFormGrid">
              <div className="quantumField">
                <label>
                  First Name
                </label>

                <input
                  type="text"
                  value={
                    formData.first_name
                  }
                  onChange={(e) => {
                    console.log("Typing:", e.target.value);

                    setFormData({
                        ...formData,
                        first_name: e.target.value,
                    });
                }}
                />
              </div>

              <div className="quantumField">
                <label>
                  Last Name
                </label>

                <input
                  type="text"
                  value={
                    formData.last_name
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      last_name:
                        e.target.value,
                    })
                  }
                />
              </div>

              <div className="quantumField quantumFieldFull">
                <label>Role</label>

                <div className="quantumRoleField">
                  <User size={18} />
                  <span>
                    Member
                  </span>
                </div>
              </div>

              <div className="quantumField">
                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  value={
                    formData.email
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email:
                        e.target.value,
                    })
                  }
                />
              </div>

              <div className="quantumField">
                <label>
                  Phone Number
                </label>

                <input
                  type="text"
                  value={
                    formData.phone
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone:
                        e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="quantumFormActions">
              <button
                type="button"
                className="quantumCancelButton"
                onClick={
                  goToProfilePage
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="quantumSaveButton"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            </div>
          </form>
        </div>

        {/* QUICK ACTIONS */}
        <div className="galaxyQuickActions">
          <h3 className="galaxyQuickActionsTitle">
            Quick Actions
          </h3>

          <div
            className="galaxyQuickActionItem"
            onClick={
              goToProfileSecurity
            }
          >
            <span className="galaxyQuickActionDot" />
            Security Settings
          </div>

          <div className="galaxyQuickActionItem">
            <span className="galaxyQuickActionDot" />
            Billing History
          </div>

          <div className="galaxyQuickActionItem">
            <span className="galaxyQuickActionDot" />
            View Public Profile
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;