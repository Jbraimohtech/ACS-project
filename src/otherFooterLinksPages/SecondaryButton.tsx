import { Link } from "react-router-dom";
import "./MemberComponents.css";

interface SecondaryButtonProps {
  text: string;
  link: string;
}

const SecondaryButton = ({
  text,
  link,
}: SecondaryButtonProps) => {
  return (
    <Link
      to={link}
      className="moonButton"
    >
      {text}
    </Link>
  );
};

export default SecondaryButton;