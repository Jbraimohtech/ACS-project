    import { ArrowLeft, User, Search, Menu } from "lucide-react";
    import "./EditProfile.css";
    import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback, type FormEvent } from "react";
    // import DashboardSidebar from "../profilePageComponent/DashboardSidebar";
    
    import { API_BASE } from "../utils/api";
    import { getProfileImageUrl, getToken, getUser, normalizeUserPayload, setUser as persistUser } from "../utils/auth";

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
    zone_name: string | null;
    zone: {
    id: number;
    name: string;
    } | null;
    role: string | null;
    role_name: string | null;
    }



    const normalizeUser = (payload: unknown, authenticatedEmail?: string | null): UserProfile | null => {
    const normalized = normalizeUserPayload(payload);

    if (!normalized) {
    return null;
    }

    const target = normalized as Partial<UserProfile> & Record<string, unknown>;
    const candidateEmail = String(target.email ?? "").trim().toLowerCase();
    const normalizedAuthenticatedEmail = authenticatedEmail?.trim().toLowerCase();

    if (normalizedAuthenticatedEmail && candidateEmail && candidateEmail !== normalizedAuthenticatedEmail) {
    return null;
    }

    const rawZone = target.zone && typeof target.zone === "object" ? target.zone as Record<string, unknown> : null;
    const normalizedZoneId = Number(target.zone_id ?? rawZone?.id ?? 0) || null;
    const normalizedZoneName = String(rawZone?.name ?? target.zone_name ?? "").trim();

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
    zone_id: normalizedZoneId,
    zone_name: normalizedZoneName || null,
    zone: normalizedZoneName
      ? { id: normalizedZoneId ?? 0, name: normalizedZoneName }
      : null,
    role: String(target.role ?? target.role_name ?? "Member"),
    role_name: String(target.role_name ?? target.role ?? "Member"),
    };
    };

    

    const EditProfile = () => {
    const navigate = useNavigate();
    // const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const query = formData.get("query")?.toString().trim() || "";

      if (query) {
        navigate(`/member-search?query=${encodeURIComponent(query)}`);
      }
    };

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

    useEffect(() => {
      const fetchRoles = async () => {
        try {
          const response = await fetch(
            "https://ambchapcorps.org/api/dashboard"
          );

          console.log("Fetch roles response:", response);

          const data = await response.json();

          console.log("Fetch roles data:", data);

          if (data.status === "success") {
            setUserState(data.data);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchRoles();
    }, []);

    const setUserData = useCallback((value: UserProfile | null) => {
    if (!value) {
      setUserState(null);
      return;
    }

    const existing = getUser() as Partial<UserProfile> | null;

    const mergedUser: UserProfile = {
      ...(existing ?? {}),
      ...value,

      // Never lose these important fields
      membership_id:
        value.membership_id ??
        existing?.membership_id ??
        null,

      zone:
        value.zone ??
        existing?.zone ??
        null,

      zone_name:
        value.zone_name ??
        existing?.zone_name ??
        null,

      role:
        value.role ??
        existing?.role ??
        "Member",

      role_name:
        value.role_name ??
        existing?.role_name ??
        "Member",

      profile_image:
        value.profile_image ??
        existing?.profile_image ??
        null,
    } as UserProfile;

    setUserState(mergedUser);
    persistUser(mergedUser);
    }, []);

    const hydrateForm = useCallback((value: UserProfile | null) => {
    setFormData({
      first_name: value?.first_name || "",
      last_name: value?.last_name || "",
      email: value?.email || "",
      phone: value?.phone || "",
    });
    }, []);

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

      const formDataWithMethod = new FormData();
      formDataWithMethod.append("profile_image", file);
      formDataWithMethod.append("_method", "PUT");

      const uploadAttempts = [
        // Try the exact URL you provided first
        {
          url: `https://ambchapcorps.org/api/dashboard/changePicture`,
          method: "POST" as const,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
        // API_BASE variations (with and without _method)
        {
          url: `${API_BASE}/dashboard/profile-image`,
          method: "POST" as const,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: formDataWithMethod,
        },
        {
          url: `${API_BASE.replace('/api','')}/api/profile/image`,
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

          // capture server response for debugging
          console.debug("Profile image upload failed", { url: attempt.url, status: response.status, body: parsed });

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

        const response = await fetch(`${API_BASE}/dashboard`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Unable to load profile");
        }

        const data = await response.json().catch(() => ({}));

        const responseBody = data as Record<string, unknown>;
        const payload = responseBody.data ?? data;
        const userPayload = (payload as Record<string, unknown>).user ?? payload;

        const normalizedProfile = normalizeUser(userPayload, normalizedStoredUser?.email);

        if (normalizedProfile) {
          setUserData(normalizedProfile);

          // hydrate only the editable fields
          setFormData({
            first_name: normalizedProfile.first_name || "",
            last_name: normalizedProfile.last_name || "",
            email: normalizedProfile.email || "",
            phone: normalizedProfile.phone || "",
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
    }, [hydrateForm, normalizedStoredUser, setUserData]);

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
          url: `${API_BASE}/dashboard`,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
        {
          url: `${API_BASE}/dashboard/updateProfile`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
        {
          url: `${API_BASE}/dashboard/updateProfile`,
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
        zone_name: user?.zone_name || normalizedStoredUser?.zone_name || null,
        zone: user?.zone || normalizedStoredUser?.zone || null,
        role: user?.role || normalizedStoredUser?.role || "Member",
        role_name: user?.role_name || normalizedStoredUser?.role_name || "Member",
      };

      const finalUser = updatedUser
    ? {
      ...mergedUser,
      ...updatedUser,

      membership_id:
        updatedUser.membership_id ??
        mergedUser.membership_id,

      zone:
        updatedUser.zone ??
        mergedUser.zone,

      zone_name:
        updatedUser.zone_name ??
        mergedUser.zone_name,

      role:
        updatedUser.role ??
        mergedUser.role,

      role_name:
        updatedUser.role_name ??
        mergedUser.role_name,
    }
    : mergedUser;

    setUserData(finalUser);
    hydrateForm(finalUser);

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
    <div className="zenProfileLayout">
      {/* <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
      <div className="orionMainContent">
        <div className="orionTopBarShellMobile">
          <div className="orionTopBarShellMobile-left">
            <button
              className="orionMobileMenuButton"
              // onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>

            <p className="dashboard-p">Edit Profile</p>
          </div>

          <div className="orionMobileLogo-crop">
            {!showMobileSearch ? (
              <button
                className="orionMobileSearchTrigger"
                onClick={() => setShowMobileSearch(true)}
              >
                <Search size={22} />
              </button>
            ) : (
              <form className="orionSearchCluster" onSubmit={handleSearchSubmit}>
                <Search size={16} className="orionSearchIcon" />

                <input
                  autoFocus
                  type="text"
                  name="query"
                  placeholder="Search members, events..."
                  className="orionSearchInput"
                />

                <button
                  type="button"
                  className="orionMobileSearchClose"
                  onClick={() => setShowMobileSearch(false)}
                >
                  ✕
                </button>
              </form>
            )}

            <div className="notify-icon-profile-box">
              <img
                src={getProfileImageUrl(user?.profile_image)}
                alt="Profile"
                className="profile-image-small"
                onError={(e) => {
                  e.currentTarget.src = "../assets/images/imageProfile-demo.jpeg";
                }}
              />
            </div>
          </div>
        </div>

        {/* TOP BAR (mobile-first) */}
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
                getProfileImageUrl(user?.profile_image)
              }
              alt={user?.first_name || "Profile"}
              className="orbitProfilePhoto"
            />

            <h3 className="orbitMemberName">
              {user?.first_name || "Member"}{" "}
              {user?.last_name ?? ""}
            </h3>

            <p className="orbitMemberRole">
              {user?.role || user?.role_name || "Member"}
            </p>

            <div className="nebulaStatusCard" style={{ marginTop: "12px", textAlign: "left" }}>
              <p className="nebulaStatusTitle">
                Account Details
              </p>

              <div className="nebulaStatusRow">
                <span className="nebulaGreenDot" />
                <span className="nebulaStatusText">
                  Membership ID: {user?.membership_id || "Not assigned"}
                </span>
              </div>



              <div className="nebulaStatusRow">
                <span className="nebulaGreenDot" />
                <span className="nebulaStatusText">
                  Zone: {user?.zone?.name || user?.zone_name || (user?.zone_id ? `Zone ${user.zone_id}` : "Not assigned")}
                </span>
              </div>
            </div>

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

              {/* Membership ID editing removed per user request */}

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
    </div>
    </div>
    );
    };

    export default EditProfile;