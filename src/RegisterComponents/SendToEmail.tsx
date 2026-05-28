import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SendToEmail: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["0", "1", "", "", "", ""]);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move to next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const navigate = useNavigate();

  const goToCreatePassword = () => {
    navigate("/register-create-password")
  }

  const goToPaymentPlan = () => {
    navigate("/payment-plan")
  }


  return (
    <div className="send-email-container">
      {/* LEFT IMAGE */}
      <div className="left-section">
        <div className="register-image"></div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="right-section">
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

        {/* HEADER */}
        <div className="header-row">
          <button className="back-btn" onClick={goToCreatePassword}>←</button>

          <div className="progress-container">
            <div className="progress active green"></div>
            <div className="progress active green"></div>
            <div className="progress active green"></div>
            <div className="progress active blue"></div>
          </div>
        </div>

        {/* OTP CARD */}
        <div className="send-email-card">
          <h2>Check your email</h2>

          <p className="description">
            We just sent a code to
            <br />
            <strong>emmanuel.emeka3715@gmail.com</strong>
          </p>

          <p className="small-text">
            Enter the six digits code in the small box below.
          </p>

          {/* OTP INPUTS */}
          <div className="otp-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="otp-input"
              />
            ))}
          </div>

          {/* RESEND */}
          <div className="resend-row">
            <span>Didn't get a code?</span>
            <button className="resend-btn">Resend</button>
          </div>

          {/* BUTTON */}
          <button className="continue-btn" onClick={goToPaymentPlan}>
            Continue
          </button>

          {/* FOOTER */}
          <p className="footer-text">
            Don’t have an account? <a href="/">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SendToEmail