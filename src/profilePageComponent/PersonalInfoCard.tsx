import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";

interface Props {
  user: User | null;
}
const PersonalInfoCard = ({ user }: Props) => {
  const navigate = useNavigate();
  const roleLabel = user?.role || user?.role_name || "Member";

  const goToEditProfile = () => {
    navigate('/edit-profile-page');
  };
  
  return (
    <>
      {/* Only on mobile Screen */}
      <div className="stellarInfoCardMobile-only-load">
        <div className="stellarInfoCardMobile-only">
          <div className="stellarInfoGroup-small">
            <label>Phone Number</label>
            <p>
              {user?.phone || "No phone number"}
            </p>
          </div>

          <div className="stellarInfoGroup-small">
            <label>Email Address</label>
            <p>
            {user?.email}
          </p>
          </div>
        </div>

        <h2>ACCOUNT DETAILS</h2>
        <div className="small-account-info-card-box">
          <div className="small-account-info-card">
            <p>Joining Date</p>
            <span>Oct 12, 2021</span>
          </div>
          <div className="small-account-info-card">
            <p>Gender</p>
            <span>{user?.gender || "Not specified"}</span>
          </div>
        </div>

        <div className="small-account-info-card-box">
          <div className="small-account-info-card">
            <p>Role</p>
            <span>{roleLabel}</span>
          </div>
          <div className="small-account-info-card">
            <p>User ID</p>
            <p>
              {user?.membership_id || "No ID"}
            </p>
          </div>
        </div>
      </div>
      {/* End of Mobile */}
    
    <div className="information-start-card">
      <div className="stellarInfoCardTitle-box">
        <div className="stellarInfoCardTitle-line"></div>
        <h3 className="stellarInfoCardTitle">Personal Information</h3>
      </div>
      <div className="stellarInfoCard">

      <div className="stellarInfoGroup">
        <label>Full Name</label>
        <p>
          {user?.first_name} {user?.last_name}
        </p>
      </div>

      <div className="stellarInfoGroup">
        <label>Phone Number</label>
        <p>
          {user?.phone || "No phone number"}
        </p>
      </div>

      <div className="stellarInfoGroup">
        <label>Email Address</label>
        <p>{user?.email}</p>
      </div>

      <button className="stellarEditBtn-bottom" onClick={goToEditProfile}>
        <div className="edit-green-pen"></div>
        Edit Profile
      </button>

      </div>
    </div>
  
    </>
  );
}

export default PersonalInfoCard