import "./EventScheduleCard.css";
import { Download } from "lucide-react";

interface Schedule {
  id: number;
  title: string;
  speaker: string;
  venue: string;
  time: string;
  duration: string;
}

interface EventScheduleCardProps {
  schedules: Schedule[];
}

const EventScheduleCard = ({
  schedules,
}: EventScheduleCardProps) => {
  return (
    <div className="about-featured-card">
      <div className="schedule-header">
        <div>
          <div className="small-horizontal-line"></div>
          <h3>Schedule</h3>
        </div>

        <button className="download-btn">
          Download PDF
          <Download size={14} />
        </button>
      </div>

      <div className="schedule-list">
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <div
              className="schedule-item"
              key={schedule.id}
            >
              <div className="time">
                {new Date(
                  schedule.time
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}

                <p>{schedule.duration}</p>
              </div>

              <div className="schedule-info">
                <div className="schedule-boxes">
                  <span className="tag blue">
                    SESSION
                  </span>

                  <h4>{schedule.title}</h4>
                </div>

                <p>
                  {schedule.venue} ·{" "}
                  {schedule.speaker}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No schedules available</p>
        )}
      </div>
    </div>
  );
};

export default EventScheduleCard;