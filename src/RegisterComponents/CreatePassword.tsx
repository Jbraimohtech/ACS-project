import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PasswordErrors {
  password?: string;
  confirmPassword?: string;
  termsAccepted?: string;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

const CreatePassword : React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [newsletter, setNewsletter] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [errors, setErrors] = useState<PasswordErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const navigate = useNavigate();

  // Password strength validator
  const getPasswordStrength = (pass: string): PasswordStrength => {
    let score = 0;
    
    if (!pass) return { score: 0, label: "No password", color: "#e0e0e0" };
    if (pass.length >= 8) score++;
    if (pass.length >= 12) score++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^a-zA-Z0-9]/.test(pass)) score++;

    if (score <= 1) return { score: 1, label: "Weak", color: "#dc2626" };
    if (score <= 2) return { score: 2, label: "Fair", color: "#f59e0b" };
    if (score <= 3) return { score: 3, label: "Good", color: "#3b82f6" };
    return { score: 4, label: "Strong", color: "#10b981" };
  };

  const validatePassword = (pass: string): string | undefined => {
    if (!pass) return "Password is required";
    if (pass.length < 8) return "Password must be at least 8 characters";
    if (!/[a-z]/.test(pass)) return "Password must contain lowercase letters";
    if (!/[A-Z]/.test(pass)) return "Password must contain uppercase letters";
    if (!/[0-9]/.test(pass)) return "Password must contain numbers";
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: PasswordErrors = {};

    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!termsAccepted) {
      newErrors.termsAccepted = "You must accept the Terms of Use and Privacy Policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    validateFieldOnBlur(field);
  };

  const validateFieldOnBlur = (field: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case "password": {
        const passwordError = validatePassword(password);
        if (passwordError) {
          newErrors.password = passwordError;
        } else {
          delete newErrors.password;
        }
        break;
      }
      case "confirmPassword": {
        if (!confirmPassword) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      }
    }

    setErrors(newErrors);
  };

  const goToRegisterSetUp = () => {
    navigate("/register-setup");
  };

  const goToSentToEmail = () => {
    if (validateForm()) {
      navigate("/register-create-email");
    }
  };

  const passwordStrength = getPasswordStrength(password);



  return (
    <div className="create-password-container">
      {/* LEFT IMAGE SECTION */}
      <div className="left-section">
        <div className="register-image"></div>
      </div>

      {/* RIGHT SECTION */}
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

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className={`input ${errors.password && touched.password ? "error" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
            />
            {password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div
                    className="strength-fill"
                    style={{
                      width: `${(passwordStrength.score / 4) * 100}%`,
                      backgroundColor: passwordStrength.color,
                    }}
                  ></div>
                </div>
                <span className="strength-text" style={{ color: passwordStrength.color }}>
                  Strength: {passwordStrength.label}
                </span>
              </div>
            )}
            {errors.password && touched.password && (
              <span className="error-message">{errors.password}</span>
            )}
            {!errors.password && password && (
              <span className="success-message">✓ Password is strong</span>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              className={`input ${errors.confirmPassword && touched.confirmPassword ? "error" : ""}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => handleBlur("confirmPassword")}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
            {!errors.confirmPassword && confirmPassword && password === confirmPassword && (
              <span className="success-message">✓ Passwords match</span>
            )}
          </div>

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

            <label className={`checkbox-label ${errors.termsAccepted && touched.termsAccepted ? "error-label" : ""}`}>
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={() => {
                  setTermsAccepted(!termsAccepted);
                  setTouched({ ...touched, termsAccepted: true });
                }}
                onBlur={() => handleBlur("termsAccepted")}
              />

              <span>
                I accept the <a href="/">Terms of Use</a> and{" "}
                <a href="/">Privacy Policy</a>
              </span>
            </label>
            {errors.termsAccepted && touched.termsAccepted && (
              <span className="error-message">{errors.termsAccepted}</span>
            )}
          </div>

          <button
            className={`continue-btn ${Object.keys(errors).length > 0 ? "disabled" : ""}`}
            onClick={goToSentToEmail}
            disabled={Object.keys(errors).length > 0}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatePassword