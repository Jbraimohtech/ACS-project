import "./EventScheduleCard.css"
import {
  Download,
} from "lucide-react";


const EventScheduleCard = () => {
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
              <div className="schedule-item">
                <div className="time">
                  09:00 AM
                  <p>60 MINS</p>
                </div>

                <div className="schedule-info">
                    <div className="schedule-boxes">
                        <span className="tag blue">
                            KEYNOTE
                        </span>

                        <h4>
                            Opening Keynote:
                            The Future of AI
                        </h4>
                    </div>

                  <p>
                    Main Auditorium · Dr.
                    Sarah Jenkins
                  </p>
                </div>
              </div>

              <div className="schedule-item">
                <div className="time">
                  10:30 AM
                  <p>90 MINS</p>
                </div>

                <div className="schedule-info">
                    <div className="schedule-boxes">
                        <span className="tag purple">
                            PANEL
                        </span>

                        <h4>
                            Decentralized Network
                            Architecture
                        </h4>
                    </div>

                  <p>
                    Room 402B · Lead
                    Architects Panel
                  </p>
                </div>
              </div>

              <div className="schedule-item">
                <div className="time">
                  12:30 PM
                  <p>120 MINS</p>
                </div>

                <div className="schedule-info">
                    <div className="schedule-boxes">
                        <span className="tag green">
                            NETWORKING
                        </span>

                        <h4>
                            Luncheon & Industry
                            Mixer
                        </h4>
                    </div>

                  <p>
                    Sky Lounge Terrace
                  </p>
                </div>
              </div>
            </div>
          </div>
    
  )
}

export default EventScheduleCard