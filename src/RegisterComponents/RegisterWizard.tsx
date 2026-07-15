import { useState } from "react";
import "./RegisterWizard.css"
import ProgressBar from "./ProgressBar";
import StepZone from "./StepZone";
import StepPersonalInfo from "./StepPersonalInfo";
import StepPassword from "./StepPassword";
import StepOtp from "./StepOtp";
import { useNavigate } from "react-router-dom";
import { setToken, setUser, isMembershipApproved } from "../utils/auth";
import { Helmet } from "react-helmet";


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

interface RegisterResponse {
  status: boolean;
  message: string;
  token?: string;
  user?: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    profile_image: string | null;
    gender: string;
    phone: string;
    zone_id: number;
    status: string;
    payment_status: boolean | number;
  };
  NewMemberNotPaid?: boolean;
  errors?: Record<string, string[]>;
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
        name: `${formData.firstName} ${formData.surname}`.trim(),
        full_name: `${formData.firstName} ${formData.surname}`.trim(),
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

      const result: RegisterResponse = await response.json();
      if (!response.ok) {
        const validationErrors =
          result.errors
            ? Object.values(result.errors)
                .flat()
                .join("\n")
            : result.message || "Registration failed"

        alert(`Registration Error (${response.status}):\n\n${validationErrors}`);
        return;
      }

      // Store auth token if provided
      if (result.token) {
        setToken(result.token);
      }

      // Store user data if provided
      if (result.user || typeof result.NewMemberNotPaid === "boolean") {
        setUser({
          ...(result.user ?? {}),
          NewMemberNotPaid: Boolean(result.NewMemberNotPaid),
        });
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

      const approvedMember = isMembershipApproved(result.user ?? result);

      // Redirect based on backend response, but allow approved users through immediately.
      if (result.NewMemberNotPaid && !approvedMember) {
        navigate("/payment-plan");
      } else {
        navigate("/dashboard-page");
      }

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
      <Helmet>
        <title>Register - Ambassadors Chaplain Corps</title>
        <meta name="description" content="Register to become a member of the Ambassadors Chaplain Corps and join our community." />
        <meta name="keywords" content="register, membership, ambassadors, chaplain, corps, join, community" />
      </Helmet>
      <div className="wizardImageSection">
        <div className="wizardImage" />
      </div>

      <div className="wizardFormSection">

        <div className="wizardTopBar">

          <h1 className="wizardLogo">
            <div className="novaLogoIcon"></div>
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