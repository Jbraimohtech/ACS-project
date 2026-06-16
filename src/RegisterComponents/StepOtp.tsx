import { useState } from "react";
import type { RegisterData } from "./RegisterWizard";

interface Props {
  data: RegisterData;
  prevStep: () => void;
}

const StepOtp = ({
  data,
  prevStep,
}: Props) => {
  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

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

      <h2>Verify Email</h2>

      <p>
        Code sent to {data.email}
      </p>

      <div className="otpContainer">
        {otp.map((item, index) => (
          <input
            key={index}
            maxLength={1}
            value={item}
            onChange={(e) => {
              const copy = [...otp];
              copy[index] = e.target.value;
              setOtp(copy);
            }}
          />
        ))}
      </div>

      <button>
        Verify
      </button>

    </div>
  );
};

export default StepOtp;