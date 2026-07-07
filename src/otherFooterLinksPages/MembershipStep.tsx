import "./MemberComponents.css";

interface MembershipStepProps {
  number: number;
  title: string;
  text: string;
}

const MembershipStep = ({
  number,
  title,
  text,
}: MembershipStepProps) => {
  return (
    <div className="waffleCastleStep">

      <div className="waffleCastleNumber">
        {number}
      </div>

      <div className="waffleCastleContent">

        <h3>{title}</h3>

        <p>{text}</p>

      </div>

    </div>
  );
};

export default MembershipStep;