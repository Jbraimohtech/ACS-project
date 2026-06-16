interface Props {
  currentStep: number;
}

const ProgressBar = ({
  currentStep,
}: Props) => {
  return (
    <div className="wizardProgress">

      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className={
            item <= currentStep
              ? "wizardProgressItem active"
              : "wizardProgressItem"
          }
        />
      ))}

    </div>
  );
};

export default ProgressBar;