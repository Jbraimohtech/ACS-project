
import { useNavigate } from "react-router-dom";
import "./Event.css"

const BeAccountedFor = () => {
  const navigate = useNavigate();

  return (
    <div className='be-accounted-for'>
        <div className='be-accounted-for-text-box'>
            <h1>Join The Movement</h1>
            <div className='be-accounted-for-image-phone'>
            </div>
            <p>Become part of a growing network of chaplains, ministers, and volunteers committed to transforming lives and communities. Whether you are called to serve, support, train, or partner with us, there is aplace for you in ACC.</p>
            <button
              type="button"
              className='confirm-part-btn'
              onClick={() => navigate("/register")}
            >
                <p>Join ACC Today</p>
            </button>
        </div>
        <div className='be-accounted-for-image'></div>
    </div>
  )
}

export default BeAccountedFor