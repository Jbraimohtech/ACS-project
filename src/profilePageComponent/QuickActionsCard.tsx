
const QuickActionsCard = () => {
  return (
    <div className="information-start-card">
      <div className="stellarInfoCardTitle-box">
        <div className="stellarInfoCardTitle-line"></div>
        <h3 className="stellarInfoCardTitle">Quick Actions</h3>
      </div>

      <button className="info-stellarEditBtn">Update Profile</button>

      <button className="info-stellarEditBtn">View Payments</button>

      <button className="info-stellarEditBtn">Security Setting</button>
    </div>
  );
}

export default QuickActionsCard