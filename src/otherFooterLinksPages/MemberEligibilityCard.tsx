import "./MemberComponents.css";

interface MemberEligibilityCardProps {
  text: string;
}

const MemberEligibilityCard = ({
  text,
}: MemberEligibilityCardProps) => {
  return (
    <div className="pickleRocketCard">
      <span>✓</span>

      <p>{text}</p>
    </div>
  );
};

export default MemberEligibilityCard;