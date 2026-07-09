import { Link } from "react-router-dom";
import "./MemberComponents.css";

const ApplyNowCTA = () => {
  return (
    <section className="dragonRocketCTA">

      <h2>
        Ready to Make a Difference?
      </h2>

      <p>
        The world needs compassionate leaders,
        disciplined servants, and people willing
        to stand in the gap during times of need.

        Your journey starts today.
      </p>

      <Link
        to="/register"
        className="rocketButton"
      >
        Apply for Membership
      </Link>

    </section>
  );
};

export default ApplyNowCTA;