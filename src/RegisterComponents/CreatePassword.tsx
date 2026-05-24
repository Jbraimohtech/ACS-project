import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePassword : React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [newsletter, setNewsletter] = useState<boolean>(true);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(true);

  const navigate = useNavigate();

  const goToRegisterSetUp = () => {
    navigate("/register-setup")
  }

  const goToSentToEmail = () => {
    navigate("/register-create-email")
  }



  return (
    <div className="create-password-container">
      {/* LEFT IMAGE SECTION */}
      <div className="left-section">
        <div className="register-image"></div>
      </div>

      {/* RIGHT SECTION */}
      <div className="right-section">
        {/* TOP BAR */}
        <div className="top-bar">
          <select className="language-select">
            <option>English (US)</option>
            <option>French</option>
            <option>Arabic</option>
          </select>
        </div>

        {/* HEADER */}
        <div className="header-row">
          <button className="back-btn" onClick={goToRegisterSetUp}>←</button>

          <div className="progress-container">
            <div className="progress active green"></div>
            <div className="progress active green"></div>
            <div className="progress active blue"></div>
            <div className="progress"></div>
          </div>
        </div>

        {/* CARD */}
        <div className="card">
          <h2>Create Password</h2>

          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* CHECKBOXES */}
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={newsletter}
                onChange={() => setNewsletter(!newsletter)}
              />

              <span>
                I agree to receive product updates, announcements,
                <br />
                and exclusive offers via email
              </span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              />

              <span>
                I accept the <a href="/">Terms of Use</a> and{" "}
                <a href="/">Privacy Policy</a>
              </span>
            </label>
          </div>

          <button className="continue-btn" onClick={goToSentToEmail}>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default CreatePassword