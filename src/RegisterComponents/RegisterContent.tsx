import { useNavigate } from "react-router-dom";
import "./Register.css"
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface Zone {
  id: string | number;
  name: string;
  [key: string]: string | number;
}

const RegisterContent : React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [zones, setZones] = useState<Zone[]>([]);
  const [zone, setZone] = useState<string | number>("");

  useEffect(() => {
    const fetchUsersZone = async () => {
      try {
        const res = await fetch(
          "https://ambchapcorps.org/api/zone"
        );
        const result = await res.json();
        console.log(result);
        console.log(result.data);
        setZones(result.data);
      } catch (error) {
        console.error("Error fetching zones:", error);
      }
    };

    fetchUsersZone();
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowModal(true);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, []);
  

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
          <h4>Zone</h4>
        </div>

        {/* Card */}
        <div className="card">
          <h2>Zone</h2>

          <label htmlFor="country">Zone</label>

          <select 
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="zone-select"
          >
            <option value="">Select a zone...</option>
            {zones.map((z) => (
              <option key={z.id} value={z.id}>
                {z.name}
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

     
      {showModal && (
        <div className="modal-overlay">
          {/* CLOSE */}
            <button
              className="registration-close-btn"
              onClick={() =>
                setShowModal(false)
              }
            >
              <X size={18} />
            </button>
          <div className="modal">
            <h2>
              Let’s get you started!
            </h2>

            {/* GOOGLE BUTTON */}
            <button className="google-btn">
              <img
                src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                alt="Google"
              />

              <span>
                Sign Up with Google
              </span>
            </button>

            {/* DIVIDER */}
            <div className="divider">
              <span>
                or continue with
              </span>
            </div>

            {/* EMAIL BUTTON */}
            <button className="google-btn">
              <img
                src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                alt="Google"
              />

              <span>
                Email Address
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RegisterContent