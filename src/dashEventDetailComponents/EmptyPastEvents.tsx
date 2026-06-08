import "./EmptyPastEvents.css"
import { useNavigate } from "react-router-dom";



const EmptyPastEvents = () => {

  const navigate = useNavigate();

  const goToPastEventPage = () => {
    navigate ("/past-event-page")
  }
  
  return (
    <div className="novaEmptyEventsWrapper">
      <div className="novaEmptyEventsIcon">
        📄
      </div>

      <h3 className="novaEmptyEventsTitle">
        You have no attended Events
      </h3>

      <p className="novaEmptyEventsText">
        Check out the Event page to get started
      </p>

      <button className="novaEmptyEventsButton" onClick={goToPastEventPage}>
        Check Event page
      </button>
    </div>
  )
}

export default EmptyPastEvents