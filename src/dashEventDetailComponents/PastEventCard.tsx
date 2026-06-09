import { Calendar } from "lucide-react";

const PastEventCard = () => {
  return (
    <div className="novaEventCard">

      <div className="novaEventImage">

        <div className="novaCompletedTag">
          COMPLETED
        </div>

      </div>

      <div className="novaEventContent">

        <div className="novaEventDate">
          <Calendar size={12} />
          August 12, 2024
        </div>

        <h3>
          Annual Strategy Summit
        </h3>

        <p>
          A deep dive into the 2025 growth
          roadmap, exploring disruptive...
        </p>

        <button className="novaRecapBtn">
          View Recap
        </button>

      </div>

    </div>
  );
};

export default PastEventCard;