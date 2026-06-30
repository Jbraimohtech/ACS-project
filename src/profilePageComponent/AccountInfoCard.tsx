import type { User } from "../types/User";

interface Props {
  user: User | null;
}

const AccountInfoCard = ({ user }: Props) => {
  const zoneLabel = user?.zone?.name || user?.zone_name || "No Zone Assigned";
  const roleLabel = user?.role || user?.role_name || "Member";

   return (
    <div className="information-start-card">
      <div className="stellarInfoCardTitle-box">
        <div className="stellarInfoCardTitle-line"></div>
        <h3 className="stellarInfoCardTitle">Account Details</h3>
      </div>
      <div className="stellarInfoCard">
      <div className="stellarInfoGroup">
        <label>Joining Date</label>
        <p>
          {new Date(
            user?.created_at || ""
          ).toLocaleDateString()}
        </p>
      </div>

      <div className="stellarInfoGroup">
        <label>Zone</label>
        <p>{zoneLabel}</p>
      </div>

      <div className="stellarInfoGroup">
        <label>Role</label>
        <p>{roleLabel}</p>
      </div>

      <div className="stellarInfoGroup">
        <label>Member ID</label>
        <p>{user?.membership_id ? `#${user.membership_id}` : `#${user?.id ?? "N/A"}`}</p>
      </div>
      </div>
    </div>
  );
}

export default AccountInfoCard