import type { RegisterData } from "./RegisterWizard";
import { useState } from "react";

interface Props {
  data: RegisterData;
  setData: React.Dispatch<
    React.SetStateAction<RegisterData>
  >;
  nextStep: () => void;
  prevStep: () => void;
}

// Email validation helper
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const StepPersonalInfo = ({
  data,
  setData,
  nextStep,
  prevStep,
}: Props) => {
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleContinue = () => {
    const newErrors: {[key: string]: string} = {};

    // Validate first name
    if (!data.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Validate surname
    if (!data.surname.trim()) {
      newErrors.surname = "Surname is required";
    }

    // Validate gender
    if (!data.gender) {
      newErrors.gender = "Gender is required";
    }

    // Validate email
    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate phone
    if (!data.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (data.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }

    // If there are errors, show alert and don't proceed
    if (Object.keys(newErrors).length > 0) {
      const errorMessages = Object.values(newErrors).join("\n");
      alert(`Please fix the following errors:\n\n${errorMessages}`);
      setErrors(newErrors);
      return;
    }

    // Clear errors and proceed
    setErrors({});
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

      <h2>Set Up Account</h2>

      <input
        placeholder="First Name"
        value={data.firstName}
        onChange={(e) => {
          setData({
            ...data,
            firstName: e.target.value,
          });
          // Clear error when user starts typing
          if (errors.firstName) {
            const newErrors = {...errors};
            delete newErrors.firstName;
            setErrors(newErrors);
          }
        }}
        style={{borderColor: errors.firstName ? "red" : "initial"}}
      />

      <input
        placeholder="Surname"
        value={data.surname}
        onChange={(e) => {
          setData({
            ...data,
            surname: e.target.value,
          });
          if (errors.surname) {
            const newErrors = {...errors};
            delete newErrors.surname;
            setErrors(newErrors);
          }
        }}
        style={{borderColor: errors.surname ? "red" : "initial"}}
      />

      <select
        value={data.gender}
        onChange={(e) => {
          setData({
            ...data,
            gender: e.target.value,
          });
          if (errors.gender) {
            const newErrors = {...errors};
            delete newErrors.gender;
            setErrors(newErrors);
          }
        }}
        style={{borderColor: errors.gender ? "red" : "initial"}}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <input
        placeholder="Email"
        type="email"
        value={data.email}
        onChange={(e) => {
          setData({
            ...data,
            email: e.target.value,
          });
          if (errors.email) {
            const newErrors = {...errors};
            delete newErrors.email;
            setErrors(newErrors);
          }
        }}
        style={{borderColor: errors.email ? "red" : "initial"}}
      />

      <input
        placeholder="Phone"
        value={data.phone}
        onChange={(e) => {
          setData({
            ...data,
            phone: e.target.value,
          });
          if (errors.phone) {
            const newErrors = {...errors};
            delete newErrors.phone;
            setErrors(newErrors);
          }
        }}
        style={{borderColor: errors.phone ? "red" : "initial"}}
      />

      <button onClick={handleContinue}>
        Continue
      </button>

    </div>
  );
};

export default StepPersonalInfo;