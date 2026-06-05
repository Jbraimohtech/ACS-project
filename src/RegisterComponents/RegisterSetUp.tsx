import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormErrors {
  firstName?: string;
  surname?: string;
  gender?: string;
  email?: string;
  phone?: string;
}

const RegisterSetUp: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+234");
  const [phone, setPhone] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Validation functions
  const validateEmail = (emailValue: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const validatePhone = (phoneValue: string): boolean => {
    const phoneRegex = /^[0-9]{7,15}$/;
    return phoneRegex.test(phoneValue.replace(/\s/g, ""));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!surname.trim()) newErrors.surname = "Surname is required";
    if (!gender) newErrors.gender = "Gender is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Invalid email format";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (!validatePhone(phone)) newErrors.phone = "Phone number must be 7-15 digits";

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
      case "firstName":
        if (!firstName.trim()) newErrors.firstName = "First name is required";
        else delete newErrors.firstName;
        break;
      case "surname":
        if (!surname.trim()) newErrors.surname = "Surname is required";
        else delete newErrors.surname;
        break;
      case "gender":
        if (!gender) newErrors.gender = "Gender is required";
        else delete newErrors.gender;
        break;
      case "email":
        if (!email.trim()) newErrors.email = "Email is required";
        else if (!validateEmail(email)) newErrors.email = "Invalid email format";
        else delete newErrors.email;
        break;
      case "phone":
        if (!phone.trim()) newErrors.phone = "Phone number is required";
        else if (!validatePhone(phone)) newErrors.phone = "Phone number must be 7-15 digits";
        else delete newErrors.phone;
        break;
    }

    setErrors(newErrors);
  };

  const goToCreatePassword = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "https://ambchapcorps.org/api/auth/register",
        {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: surname,
            email,
            gender: gender,
            phone: `${countryCode}${phone}`,
          })
        }
      );

      const data = await response.json();

      console.log("Status:", response.status);
      console.log("Response:", data);

      if (response.ok) {
        navigate("/register-create-password");
      } else {
        alert(
          data.message ||
            "Registration failed"
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "Unable to connect to server"
      );
    } finally {
      setLoading(false);
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

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
          <div className="form-group">
            <input
              type="text"
              placeholder="First Name"
              className={`input ${errors.firstName && touched.firstName ? "error" : ""}`}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={() => handleBlur("firstName")}
            />
            {errors.firstName && touched.firstName && (
              <span className="error-message">{errors.firstName}</span>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Surname"
              className={`input ${errors.surname && touched.surname ? "error" : ""}`}
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              onBlur={() => handleBlur("surname")}
            />
            {errors.surname && touched.surname && (
              <span className="error-message">{errors.surname}</span>
            )}
          </div>

          <div className="select-wrapper">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              onBlur={() => handleBlur("gender")}
              className={`select-box-con select ${errors.gender && touched.gender ? "error" : ""}`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && touched.gender && (
              <span className="error-message">{errors.gender}</span>
            )}
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              className={`input ${errors.email && touched.email ? "error" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
            />
            {errors.email && touched.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          {/* PHONE INPUT */}
          <div className="form-group">
            <div className={`phone-wrapper ${errors.phone && touched.phone ? "error" : ""}`}>
              <div className="country-code">
                <span className="dot"></span>
                <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                  <option>+234</option>
                  <option>+1</option>
                  <option>+44</option>
                </select>
              </div>

              <input
                type="tel"
                placeholder="Phone Number"
                className={`phone-input ${errors.phone && touched.phone ? "error" : ""}`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => handleBlur("phone")}
              />
            </div>
            {errors.phone && touched.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>

          <button
            className="continue-btn"
            onClick={goToCreatePassword}
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterSetUp;