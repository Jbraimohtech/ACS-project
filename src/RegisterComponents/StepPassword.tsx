import type { RegisterData } from "./RegisterWizard";

interface Props {
  data: RegisterData;
  setData: React.Dispatch<
    React.SetStateAction<RegisterData>
  >;
  nextStep: () => void;
  prevStep: () => void;
  loading?: boolean;
}

const StepPassword = ({
  data,
  setData,
  nextStep,
  prevStep,
  loading,
}: Props) => {
  return (
    <div className="wizardCard">

      <div className="wizardCard-backButton">
        <button
          className="backButton"
          onClick={prevStep}
          disabled={loading}
        >
          ←
        </button>
      </div>

      <h2>Create Password</h2>

      <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) =>
                setData({
                ...data,
                password: e.target.value,
                })
            }
            disabled={loading}
        />


      <input
        type="password"
        placeholder="Confirm Password"
        value={data.confirmPassword}
        onChange={(e) =>
            setData({
            ...data,
            confirmPassword: e.target.value,
            })
        }
        disabled={loading}
      />

        <button
            onClick={nextStep}
            disabled={loading}
            >
            {loading
                ? "Creating Account..."
                : "Continue"}
        </button>

    </div>
  );
};

export default StepPassword;