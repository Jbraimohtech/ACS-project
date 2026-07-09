import "./MemberComponents.css";

interface MemberBenefitCardProps {
  title: string;
  text: string;
  icon: string;
}

const MemberBenefitCard = ({
  title,
  text,
  icon,
}: MemberBenefitCardProps) => {
  return (
    <div className="bananaWizardCard">
      <div className="bananaWizardIcon">{icon}</div>

      <h3>{title}</h3>

      <p>{text}</p>
    </div>
  );
};

export default MemberBenefitCard;