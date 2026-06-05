import {
  Shield,
  Eye,
} from "lucide-react";

const ProfileSecurity = () => {
   return (
    <div className="auroraSecurityWrapper">
      {/* Breadcrumb */}
      <div className="auroraBreadcrumb">
        <span className="auroraActiveCrumb-one">
            <div className="material-arrow-back-icon"></div>
            Edit Profile
        </span>


        <span className="auroraActiveCrumb">
            <div className="material-arrow-back-icon"></div>
          Security setting
        </span>
      </div>

      {/* Header */}
      <div className="auroraHeader">
        <h1>Security & Privacy</h1>

        <p>
          Manage your account protection,
          data visibility
        </p>
      </div>

      {/* Top Grid */}
      <div className="auroraTopGrid">
        {/* Authentication */}
        <div className="novaCard">
          <div className="novaCardHeader">
            <div className="novaCardLine" />

            <h3>Authentication</h3>

            <div className="novaCardIcon">
              <Shield size={16} />
            </div>
          </div>

          <div className="novaPasswordGrid">
            <div className="novaField">
              <label>Current Password</label>

              <input
                type="password"
                value="******"
                readOnly
              />
            </div>

            <div className="novaField">
              <label>New Password</label>

              <input
                type="password"
                value="******"
                readOnly
              />
            </div>
          </div>

          <div className="novaTwoFactorCard">
            <div>
              <h4>Two factor Authentication</h4>

              <p>
                Requires a code from your
                mobile device to log in.
              </p>
            </div>

            <label className="novaSwitch">
              <input
                type="checkbox"
                defaultChecked
              />
              <span />
            </label>
          </div>

          <button className="novaUpdateButton">
            Update Credentials
          </button>
        </div>

        {/* Visibility */}
        <div className="novaCard">
          <div className="novaCardHeader">
            <div className="novaCardLine" />

            <h3>Visibility</h3>

            <div className="novaCardIcon danger">
              <Eye size={16} />
            </div>
          </div>

          <label className="visibilityOption active">
            <input
              type="radio"
              name="visibility"
              defaultChecked
            />

            Public
          </label>

          <label className="visibilityOption">
            <input
              type="radio"
              name="visibility"
            />

            Members only
          </label>

          <label className="visibilityOption">
            <input
              type="radio"
              name="visibility"
            />

            Private
          </label>

          <div className="visibilityToggle">
            <span>
              Show email on profile
            </span>

            <label className="novaSwitch">
              <input
                type="checkbox"
                defaultChecked
              />
              <span />
            </label>
          </div>

          <div className="visibilityToggle">
            <span>
              Show phone on profile
            </span>

            <label className="novaSwitch">
              <input
                type="checkbox"
                defaultChecked
              />
              <span />
            </label>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="auroraBottomGrid">
        {/* Login Activity */}
        <div className="novaCard-spread">
            <div className="novaCardHeader">
                <div className="novaCardLine" />
                <h3>Login Activities</h3>
            </div>
            <div className="novaCard">

            <table className="auroraTable">
                <thead>
                <tr>
                    <th>Device</th>
                    <th>Location</th>
                    <th>Last active</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>Chrome on macOS</td>
                    <td>San Francisco, USA</td>
                    <td>Active</td>
                </tr>

                <tr>
                    <td>Chrome on macOS</td>
                    <td>San Francisco, USA</td>
                    <td>Active</td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>

        {/* Notification */}
        <div className="novaCard-spread">
            <div className="novaCardHeader">
                <div className="novaCardLine" />
                <h3>Notification</h3>
            </div>
            <div className="novaCard">

            <div className="notificationItem">
                Email Alert
            </div>

            <div className="notificationItem">
                Event Updates
            </div>

            <div className="notificationItem">
                Payment Reminders
            </div>
            </div>
        </div>

        {/* Quick Actions */}
        <div className="novaQuickActions">
          <div className="novaCardHeader">
            <div className="novaCardLine" />
            <h3>Quick Actions</h3>
          </div>

          <div className="quickAction">
            <span />
            Privacy
          </div>

          <div className="quickAction">
            <span />
            Login History
          </div>

          <div className="quickAction">
            <span />
            Data control
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSecurity