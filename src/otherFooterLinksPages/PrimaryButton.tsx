import { Link } from "react-router-dom";
import "./MemberComponents.css";

interface PrimaryButtonProps {
  text: string;
  link: string;
}

const PrimaryButton = ({
  text,
  link,
}: PrimaryButtonProps) => {
  return (
    <Link
      to={link}
      className="rocketButton"
    >
      {text}
    </Link>
  );
};

export default PrimaryButton;