
import { useNavigate } from "react-router-dom";
import "./Event.css"

const BeAccountedFor = () => {
  const navigate = useNavigate();

  return (
    <div className='be-accounted-for'>
        <div className='be-accounted-for-text-box'>
            <h1>Be Accounted For</h1>
            <div className='be-accounted-for-image-phone'>
            </div>
            <p>Attendance is not just recorded — 
                it reflects commitment, discipline, and
                participation in the mission.</p>
            <button
              type="button"
              className='confirm-part-btn'
              onClick={() => navigate("/register")}
            >
                <p>Confirm participation</p>
            </button>
        </div>
        <div className='be-accounted-for-image'></div>
    </div>
  )
}

export default BeAccountedFor