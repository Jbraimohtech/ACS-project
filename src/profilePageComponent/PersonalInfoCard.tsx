
const PersonalInfoCard = () => {
  return (
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

      <button className="stellarEditBtn-bottom">
        <div className="edit-green-pen"></div>
        Edit Profile
      </button>

      </div>
    </div>
  );
}

export default PersonalInfoCard