import { useState } from "react";
import "./RegisterWizard.css"
import ProgressBar from "./ProgressBar";
import StepZone from "./StepZone";
import StepPersonalInfo from "./StepPersonalInfo";
import StepPassword from "./StepPassword";
import StepOtp from "./StepOtp";



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
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const [loading, setLoading] =
  useState(false);

    const [error, setError] =
    useState("");

    const registerUser = async () => {
    try {
        setLoading(true);
        setError("");

        const response = await fetch(
        "https://ambchapcorps.org/api/auth/register",
        {
            method: "POST",
            mode: "cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
            first_name: formData.firstName,
            last_name: formData.surname,
            email: formData.email,
            password: formData.password,
            password_confirmation:
                formData.confirmPassword,
            gender: formData.gender,
            phone: formData.phone,
            zone_id: formData.zone,
            }),
        }
        );

        console.log(response);

        const result =
        await response.json();

        if (!response.ok) {
          const validationErrors =
            result.errors
              ? Object.values(result.errors)
                  .flat()
                  .join(", ")
              : result.message;

          throw new Error(validationErrors);
        }

        console.log(
        "Registration Success",
        result
        );

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

        setStep(4);
    } catch (err: unknown) {
    if (err instanceof Error) {
        setError(err.message);
        // Reset loading state but keep form data so user can fix and retry
    } else {
        setError("An unexpected error occurred");
    }
    } finally {
        setLoading(false);
    }
    };

  return (
    <div className="wizardPage">
        {error && (
            <div className="errorMessage">
                {error}
            </div>
        )}

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
                loading={loading}
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