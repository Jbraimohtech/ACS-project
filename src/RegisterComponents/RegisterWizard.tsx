import { useState } from "react";
import "./RegisterWizard.css"
import ProgressBar from "./ProgressBar";
import StepZone from "./StepZone";
import StepPersonalInfo from "./StepPersonalInfo";
import StepPassword from "./StepPassword";
import StepOtp from "./StepOtp";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../utils/auth";


export interface RegisterData {
  zone: number | "";
  firstName: string;
  surname: string;
  gender: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const RegisterWizard = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] =
  useState<RegisterData>({
    zone: "",
    firstName: "",
    surname: "",
    gender: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const registerUser = async () => {
    if (submitting) {
      return;
    }

    try {
      setSubmitting(true);

      // Validate password match
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
      }

      // Validate all required fields
      if (!formData.zone || !formData.firstName || !formData.surname || !formData.gender || !formData.email || !formData.phone || !formData.password) {
        alert("All fields are required. Please fill in all fields.");
        return;
      }

      const payload = {
        first_name: formData.firstName,
        last_name: formData.surname,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        gender: formData.gender?.toLowerCase(),
        phone: formData.phone,
        zone_id: formData.zone,
      };

      const response = await fetch(
        "https://ambchapcorps.org/api/auth/register",
        {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        const validationErrors =
          result.errors
            ? Object.values(result.errors)
                .flat()
                .join("\n")
            : result.message || result.error || "Registration failed";

        alert(`Registration Error (${response.status}):\n\n${validationErrors}`);
        return;
      }

      // Store auth token if provided
      if (result.token) {
        setToken(result.token);
      }

      // Store user data if provided
      if (result.user) {
        setUser(result.user);
      }

      console.log("Registration Success", result);

      // Clear form data after successful registration
      setFormData({
        zone: "",
        firstName: "",
        surname: "",
        gender: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to payment plan after success
      navigate("/payment-plan");

    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`Error: ${err.message}`);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="wizardPage">
      <div className="wizardImageSection">
        <div className="wizardImage" />
      </div>

      <div className="wizardFormSection">

        <div className="wizardTopBar">

          <h1 className="wizardLogo">
            LOGO
          </h1>

          <select>
            <option>English (US)</option>
            <option>French</option>
            <option>Arabic</option>
          </select>

        </div>

        <ProgressBar currentStep={step} />

        {step === 1 && (
          <StepZone
            data={formData}
            setData={setFormData}
            nextStep={nextStep}
          />
        )}

        {step === 2 && (
          <StepPersonalInfo
            data={formData}
            setData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {step === 3 && (
            <StepPassword
                data={formData}
                setData={setFormData}
                nextStep={registerUser}
                prevStep={prevStep}
                isSubmitting={submitting}
            />
        )}

        {step === 4 && (
          <StepOtp
            data={formData}
            prevStep={prevStep}
          />
        )}

      </div>

    </div>
  );
};

export default RegisterWizard;