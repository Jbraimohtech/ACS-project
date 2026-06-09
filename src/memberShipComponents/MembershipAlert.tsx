import { AlertTriangle } from "lucide-react";

const MembershipAlert = () => {
  return (
    <div className="stellarMembershipAlert">

      <div className="stellarAlertLeft">
        <AlertTriangle size={16} />

        <span>
          Your subscription will expire in
          5 days. Renew now to avoid interruption.
        </span>
      </div>

      <button>
        Renew now
      </button>

    </div>
  )
}

export default MembershipAlert