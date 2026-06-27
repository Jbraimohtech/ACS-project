import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MembershipAlertProps {
  show?: boolean;
  message?: string;
  notificationCount?: number;
}

const MembershipAlert = ({ show = false, message, notificationCount = 0 }: MembershipAlertProps) => {
  const navigate = useNavigate();

  if (!show) {
    return null;
  }

  return (
    <div className="stellarMembershipAlert">
      <div className="stellarAlertLeft">
        <AlertTriangle size={16} />

        <div className="stellarAlertText">
          <p>
            {message || "Your membership payment is due soon. Pay now to avoid interruption."}
            {notificationCount > 0
              ? ` You have ${notificationCount} new notification${notificationCount === 1 ? "" : "s"}.`
              : ""}
          </p>
        </div>
      </div>

      <button onClick={() => navigate("/payment-plan")}>
        Pay now
      </button>
    </div>
  );
};

export default MembershipAlert