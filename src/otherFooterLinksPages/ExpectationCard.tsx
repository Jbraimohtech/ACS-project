import "./MemberComponents.css";

interface ExpectationCardProps {
  text: string;
}

const ExpectationCard = ({
  text,
}: ExpectationCardProps) => {
  return (
    <div className="cheeseMeteorCard">
      <span>✔</span>

      <p>{text}</p>
    </div>
  );
};

export default ExpectationCard;