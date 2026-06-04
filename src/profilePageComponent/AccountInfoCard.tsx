
const AccountInfoCard = () => {
   return (
    <div className="information-start-card">
      <div className="stellarInfoCardTitle-box">
        <div className="stellarInfoCardTitle-line"></div>
        <h3 className="stellarInfoCardTitle">Account Details</h3>
      </div>
      <div className="stellarInfoCard">
      <div className="stellarInfoGroup">
        <label>Joining Date</label>
        <p>Oct 14, 2021</p>
      </div>

      <div className="stellarInfoGroup">
        <label>Zone</label>
        <p>Edo Zone</p>
      </div>

      <div className="stellarInfoGroup">
        <label>Role</label>
        <p>Member</p>
      </div>

      <div className="stellarInfoGroup">
        <label>Member ID</label>
        <p>#12345</p>
      </div>
      </div>
    </div>
  );
}

export default AccountInfoCard