import { useNavigate } from "react-router-dom";

const PersonalInfoCard = () => {
  const navigate = useNavigate();

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
            <p>+ (123) 1800-567-8990</p>
          </div>

          <div className="stellarInfoGroup-small">
            <label>Email Address</label>
            <p>emmanuel@gmail.com</p>
          </div>
        </div>

        <h2>ACCOUNT DETAILS</h2>
        <div className="small-account-info-card-box">
          <div className="small-account-info-card">
            <p>Joining Date</p>
            <span>Oct 12, 2021</span>
          </div>
          <div className="small-account-info-card">
            <p>Department</p>
            <span>Product Org</span>
          </div>
        </div>

        <div className="small-account-info-card-box">
          <div className="small-account-info-card">
            <p>Role</p>
            <span>Enterprise Admin</span>
          </div>
          <div className="small-account-info-card">
            <p>User ID</p>
            <span>#1234567</span>
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
        <p>Chukwutem Emmanuel</p>
      </div>

      <div className="stellarInfoGroup">
        <label>Phone Number</label>
        <p>+ (123) 1800-567-8990</p>
      </div>

      <div className="stellarInfoGroup">
        <label>Email Address</label>
        <p>emmanuel@gmail.com</p>
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