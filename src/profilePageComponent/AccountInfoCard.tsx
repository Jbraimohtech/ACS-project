import type { User } from "../types/User";

interface Props {
  user: User | null;
}

const AccountInfoCard = ({ user }: Props) => {
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
        <p>
          {user?.zone?.name ||
            "No Zone Assigned"}
        </p>
      </div>

      <div className="stellarInfoGroup">
        <label>Role</label>
        <p>
          {user?.membership_id ||
            `User #${user?.id}`}
        </p>
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