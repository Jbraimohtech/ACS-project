import type { RegisterData } from "./RegisterWizard";

interface Props {
  data: RegisterData;
  setData: React.Dispatch<
    React.SetStateAction<RegisterData>
  >;
  nextStep: () => void;
  prevStep: () => void;
}

const StepPersonalInfo = ({
  data,
  setData,
  nextStep,
  prevStep,
}: Props) => {
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
        onChange={(e) =>
          setData({
            ...data,
            firstName: e.target.value,
          })
        }
      />

      <input
        placeholder="Surname"
        value={data.surname}
        onChange={(e) =>
          setData({
            ...data,
            surname: e.target.value,
          })
        }
      />

      <select
        value={data.gender}
        onChange={(e) =>
          setData({
            ...data,
            gender: e.target.value,
          })
        }
      >
        <option>Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <input
        placeholder="Email"
        value={data.email}
        onChange={(e) =>
          setData({
            ...data,
            email: e.target.value,
          })
        }
      />

      <input
        placeholder="Phone"
        value={data.phone}
        onChange={(e) =>
          setData({
            ...data,
            phone: e.target.value,
          })
        }
      />

      <button onClick={nextStep}>
        Continue
      </button>

    </div>
  );
};

export default StepPersonalInfo;