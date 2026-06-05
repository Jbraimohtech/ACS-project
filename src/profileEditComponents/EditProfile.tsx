import { ArrowLeft, User } from "lucide-react";
import "./EditProfile.css"
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const navigate = useNavigate();

    const goToProfilePage = () => {
        navigate('/profile-page');
    };

    const goToProfileSecurity = () => {
        navigate('/profile-security-page');
    };

  return (
    <div className="cosmosEditProfileWrapper">
      {/* Header */}
      <div className="cosmosEditProfileHeader">
        <div className="cosmosBackRow">
          <ArrowLeft size={18} onClick={goToProfilePage} />
          <span>Edit Profile</span>
        </div>

        <h1 className="cosmosPageTitle">
          Edit Profile
        </h1>

        <p className="cosmosPageSubtitle">
          Manage your public identity and account settings
        </p>
      </div>

      {/* Content */}
      <div className="cosmosEditProfileGrid">
        {/* LEFT PANEL */}
        <div className="orbitProfilePanel">
          <div className="orbitUserCard">
            <img
              src="/profile.jpg"
              alt="profile"
              className="orbitProfilePhoto"
            />

            <h3 className="orbitMemberName">
              Sophie Bennett
            </h3>

            <p className="orbitMemberRole">
              Unit Coordinator
            </p>

            <button className="orbitPhotoLink">
              Change Profile Picture
            </button>
          </div>

          <div className="nebulaStatusCard">
            <p className="nebulaStatusTitle">
              Profile Status
            </p>

            <div className="nebulaStatusRow">
              <span className="nebulaGreenDot" />
              <span className="nebulaStatusText">
                Publicly Visible
              </span>
            </div>

            <p className="nebulaStatusDescription">
              Your profile is visible to other
              team members and external
              stakeholders you collaborate
              with.
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="quantumFormCard">
          <form>
            <div className="quantumFormGrid">
              <div className="quantumField">
                <label>First Name</label>

                <input
                  type="text"
                  defaultValue="Sophie"
                />
              </div>

              <div className="quantumField">
                <label>Last Name</label>

                <input
                  type="text"
                  defaultValue="Bennett"
                />
              </div>

              <div className="quantumField quantumFieldFull">
                <label>Role</label>

                <div className="quantumRoleField">
                  <User size={18} />
                  <span>Member</span>
                </div>
              </div>

              <div className="quantumField">
                <label>Email Address</label>

                <input
                  type="email"
                  defaultValue="sophie@gmail.com"
                />
              </div>

              <div className="quantumField">
                <label>Phone Number</label>

                <input
                  type="text"
                  defaultValue="+234 801 234 5678"
                />
              </div>
            </div>

            <div className="quantumFormActions">
              <button
                type="button"
                className="quantumCancelButton"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="quantumSaveButton"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* QUICK ACTIONS */}
        <div className="galaxyQuickActions">
          <h3 className="galaxyQuickActionsTitle">
            Quick Actions
          </h3>

          <div className="galaxyQuickActionItem" onClick={goToProfileSecurity}>
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
  )
}

export default EditProfile