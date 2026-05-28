import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterSetUp: React.FC = () => {
  const [gender, setGender] = useState<string>("");
  const navigate = useNavigate();

  const goToCreatePassword = () => {
    navigate("/register-create-password")
  }

  const goToRegister = () => {
    navigate("/register")
  }


  return (
    <div className="register-setup-container">
      {/* LEFT IMAGE */}
      <div className="register-set-up-left-section">
        <div className="register-image"></div>
      </div>

      {/* RIGHT FORM */}
      <div className="register-set-up-right-section">
        <div className="the-language-box">
          <div>
            <h1 className="register-logo">LOGO</h1>
          </div>
        {/* Language Selector */}
          <div className="top-bar">
            <select className="language-select">
              <option>English (US)</option>
              <option>French</option>
              <option>Arabic</option>
            </select>
          </div>
        </div>

        <div className="header-row">
          <button className="back-btn" onClick={goToRegister}>←</button>

          {/* PROGRESS */}
          <div className="progress-container">
            <div className="progress active green"></div>
            <div className="progress active blue"></div>
            <div className="progress"></div>
            <div className="progress"></div>
          </div>
        </div>

        

        {/* TITLE */}
        <h1 className="title">Set Up your Account</h1>

        {/* FORM CARD */}
        <div className="form-container">
          <input type="text" placeholder="First Name" className="input" />

          <input type="text" placeholder="Surname" className="input" />

          <div className="select-wrapper">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="select-box-con select"
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <input type="email" placeholder="Email Address" className="input" />

          {/* PHONE INPUT */}
          <div className="phone-wrapper">
            <div className="country-code">
              <span className="dot"></span>
              <select>
                <option>+234</option>
                <option>+1</option>
                <option>+44</option>
              </select>
            </div>

            <input
              type="tel"
              placeholder="Phone Number"
              className="phone-input"
            />
          </div>

          <button className="continue-btn" onClick={goToCreatePassword}>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default RegisterSetUp