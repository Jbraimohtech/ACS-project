import { useNavigate } from "react-router-dom";
import "./Register.css"
import { useState } from "react";

const countries = [
  "Algeria",
  "United States",
  "Canada",
  "France",
  "Germany",
];
const RegisterContent : React.FC = () => {
  const [country, setCountry] = useState<string>("Algeria");
  const navigate = useNavigate();

  const goToRegisterSetUp = () => {
    navigate("/register-setup")
  }

  return (
    
    <div className="register-content-container">
      {/* Left Side */}
      <div className="left-panel">
        <div className="register-image"></div>
      </div>

      {/* Right Side */}
      <div className="right-panel">

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

        {/* Progress Steps */}
        <div className="steps">
          <div className="step active"></div>
          <div className="step"></div>
          <div className="step"></div>
          <div className="step"></div>
        </div>

        {/* Step Label */}
        <div className="step-label">
          <span>Step 1</span>
          <h4>Country of Residence</h4>
        </div>

        {/* Card */}
        <div className="card">
          <h2>Country of Residence</h2>

          <label htmlFor="country">Country</label>

          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="country-select"
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button className="continue-btn" onClick={goToRegisterSetUp}>Continue</button>
        </div>

        {/* Footer */}
        <div className="register-footer-text-box">
            <p className="register-footer-text">
            Got an account? <a href="/">Sign in</a>
            </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterContent