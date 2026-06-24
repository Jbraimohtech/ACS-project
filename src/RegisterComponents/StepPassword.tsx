import type { RegisterData } from "./RegisterWizard";
import { useState } from "react";

interface Props {
  data: RegisterData;
  setData: React.Dispatch<
    React.SetStateAction<RegisterData>
  >;
  nextStep: () => void;
  prevStep: () => void;
  isSubmitting: boolean;
}

const StepPassword = ({
  data,
  setData,
  nextStep,
  prevStep,
  isSubmitting,
}: Props) => {
  const [passwordError, setPasswordError] = useState("");

  const handleContinue = () => {
    // Reset error
    setPasswordError("");

    // Validate password not empty
    if (!data.password || !data.confirmPassword) {
      setPasswordError("Both password fields are required.");
      return;
    }

    // Validate password length
    if (data.password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    // Validate passwords match
    if (data.password !== data.confirmPassword) {
      setPasswordError("Passwords do not match. Please ensure both passwords are the same.");
      return;
    }

    // If all validations pass, proceed
    nextStep();
  };

  return (
    <div className="wizardCard">

      <div className="wizardCard-backButton">
        <button
          className="backButton"
          onClick={prevStep}
        >
          ←
        </button>
      </div>

      <h2>Create Password</h2>

      <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={data.password}
            onChange={(e) => {
                setPasswordError("");
                setData({
                ...data,
                password: e.target.value,
                })
            }}
        />


      <input
        type="password"
        placeholder="Confirm Password"
        value={data.confirmPassword}
        onChange={(e) => {
            setPasswordError("");
            setData({
            ...data,
            confirmPassword: e.target.value,
            })
        }}
      />

      {passwordError && (
        <p style={{ color: "red", fontSize: "12px" }}>
          {passwordError}
        </p>
      )}

      <button
        onClick={handleContinue}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Continue"}
      </button>

    </div>
  );
};

export default StepPassword;