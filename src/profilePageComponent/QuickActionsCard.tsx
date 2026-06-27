import { useNavigate } from "react-router-dom";

const QuickActionsCard = () => {
  const navigate = useNavigate();

  return (
    <div className="information-start-card">
      <div className="stellarInfoCardTitle-box">
        <div className="stellarInfoCardTitle-line"></div>
        <h3 className="stellarInfoCardTitle">Quick Actions</h3>
      </div>

      <button className="info-stellarEditBtn" onClick={() => navigate("/edit-profile-page")}>
        Update Profile
      </button>

      <button className="info-stellarEditBtn" onClick={() => navigate("/billing-payment-page")}>
        View Payments
      </button>

      <button className="info-stellarEditBtn" onClick={() => navigate("/profile-security-page")}>
        Security Setting
      </button>
    </div>
  );
};

export default QuickActionsCard